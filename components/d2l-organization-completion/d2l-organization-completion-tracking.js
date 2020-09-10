import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';

import { css, html, LitElement } from 'lit-element';

import { classMap } from 'lit-html/directives/class-map.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { performSirenAction } from 'siren-sdk/src/es6/SirenAction.js';
import { MixinEntityLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { OrganizationEntity } from 'siren-sdk/src/organizations/OrganizationEntity.js';

import { LocalizeOrganizationCompletion } from './localization.js';

class CompletionTracking extends MixinEntityLit(LocalizeOrganizationCompletion(LitElement)) {

	static get properties() {
		return {
			_error: { type: String },
			_initialValues: { type: Object },
			_newValues: { type: Object },
			_showProgressTracking: { type: Boolean }
		};
	}

	static get styles() {
		return [bodySmallStyles, css`
			.d2l-hidden {
				display: none;
			}
			.d2l-subfield {
				margin-left: 3rem;
			}
			.d2l-button-container {
				margin-top: 1.5rem;
			}
			d2l-input-checkbox {
				margin-bottom: 0;
			}
		`];
	}

	constructor() {
		super();
		this._initialValues = {
			isCompletionTracked: undefined,
			isProgressDisplayed: undefined
		};
		this._newValues = {};
		this._setEntityType(OrganizationEntity);
		await this._entity.subEntitiesLoaded();

		if ( this._entity.hasActionByName('track-completion')){
			this._initialValues._isCompletionTracked = false;
		} else {
			this._initialValues._isCompletionTracked = true;
		}
		if ( this._entity.hasActionByName('display-progress') ){
			this._initialValues._isProgressDisplayed = false;
		} else {
			this._initialValues._isProgressDisplayed = true;
		}
	}

	render() {
		const isCompletionTracked = this._newValues.isCompletionTracked !== undefined ?
			this._newValues.isCompletionTracked :
			this._initialValues.isCompletionTracked;
		const isProgressDisplayed = this._newValues.isProgressDisplayed !== undefined ?
			this._newValues.isProgressDisplayed :
			this._initialValues.isProgressDisplayed;
		const showDisableWarning = this._initialValues.isCompletionTracked && this._newValues.isCompletionTracked === false;
		const showProgressTracking = this._showProgressTracking === undefined && this._initialValues.isCompletionTracked ||
			this._showProgressTracking;
		const completionHelpClasses = {
			'd2l-body-small': true,
			'd2l-hidden': this._initialValues.isCompletionTracked
		};
		const progressTrackingClasses = {
			'd2l-subfield': true,
			'd2l-hidden': !showProgressTracking
		};
		return html`
			<h1>${this.localize('mainTitle')}</h1>
			<div class="compact">
				<p>${this.localize('mainDesc')}</p>
			</div>
			<h3>${this.localize('subTitle')}</h3>
			<d2l-input-checkbox
				id="chkCompletionTracked"
				?checked="${isCompletionTracked}"
				@change="${this._onTrackingChange}">${this.localize('checkboxLabel')}</d2l-input-checkbox>
			<d2l-input-checkbox-spacer class="${classMap(completionHelpClasses)}" id="chkCompletionHelp">
				${this.localize('enableWarning')}
			</d2l-input-checkbox-spacer>
			<br/>
			<d2l-alert type="warning" ?hidden="${!showDisableWarning}" id="disableWarningAlert">
				${this.localize('disableWarning')}
			</d2l-alert>
			<div class="${classMap(progressTrackingClasses)}" id="progressFieldsContainer">
				<d2l-input-checkbox
					id="chkDisplayProgress"
					?disabled="${false}"
					?checked="${isProgressDisplayed}"
					@change="${this._onProgressChange}">
					${this.localize('displayProgressCheckboxLabel')}
				</d2l-input-checkbox>
				<d2l-input-checkbox-spacer class="d2l-body-small">
					${this.localize('displayProgressCheckboxSubText')}
				</d2l-input-checkbox-spacer>
			</div>
			<div class="d2l-button-container">
				<d2l-button
					id="btnSaveCompletion"
					class="btnMargins"
					aria-label="${this.localize('saveText')}"
					@click="${this._onSaveClick}"
					primary
					?disabled=${!this._valuesChanged}>${this.localize('saveText')}</d2l-button>
				<d2l-button
					id="btnCancelCompletion"
					class="btnMargins"
					aria-label="${this.localize('cancelText')}"
					@click="${this._onCancelClick}">${this.localize('cancelText')}</d2l-button>
			</div>
			<br />
			<d2l-alert type="critical" ?hidden="${!this._error}">${this._error}</d2l-alert>

			<d2l-dialog title-text="${this.localize('dlgDisableTitle')}" id="confirmDisableDialog">
				<div>${unsafeHTML(this.localize('dlgDisableSecondaryMessage'))}</div>
				<d2l-button slot="footer" primary data-dialog-action="yes">${this.localize('dlgDisablePositiveButtonText')}</d2l-button>
				<d2l-button slot="footer" data-dialog-action>${this.localize('dlgDisableNegativeButtonText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	get _valuesChanged() {
		return this._initialValues.isCompletionTracked !== this._newValues.isCompletionTracked ||
			this._initialValues.isProgressDisplayed !== this._newValues.isProgressDisplayed;
	}

	async _confirmDisable() {
		const action = await this.shadowRoot.querySelector('#confirmDisableDialog').open();
		return action === 'yes';
	}

	_onProgressChange(e) {
		this._newValues.isProgressDisplayed = e.target.checked;
	}

	_onTrackingChange(e) {
		this._showProgressTracking = e.target.checked;
		this._newValues.isCompletionTracked = e.target.checked;
		// turn on progress display by default
		if (e.target.checked) {
			this._newValues.isProgressDisplayed = true;
		}
	}

	_onCancelClick() {
		return this._goToCourseHomepage();
	}

	async _onSaveClick() {
		if (this._initialValues.isCompletionTracked !== this._newValues.isCompletionTracked) {
			if ((this._initialValues.isCompletionTracked && (await this._confirmDisable())) || this._newValues.isCompletionTracked) {
				let actionName = 'do-not-track-completion';
				if(!this._initialValues.isCompletionTracked){
					actionName = 'track-completion';
				}
				let action = null;
				if ( this._entity.hasActionByName(actionName) ){
					action = this._entity.getActionByName(actionName);
				}
				if ( action == null ) {
					return // ?
				}
				const fields = [{name: 'track', value: this._newValues.isCompletionTracked}];
				await Promise.resolve(performSirenAction(this.token, action, fields, false));
			}
		}

		if ( this._initialValues.isProgressDisplayed !== this._newValues.isProgressDisplayed ) {
			let actionName = 'do-not-display-progress';
			if(!this._initialValues._isProgressDisplayed){
				actionName = 'display-progress';
			}
			let action = null;
			if ( this._entity.hasActionByName) {
				action = this._entity.getActionByName(actionName);
			} else {
				return // ?
			}
			const fields = [{name: 'enable', value: this._newValues.isProgressDisplayed}];
			await Promise.resolve(performSirenAction(this.token, action, fields, false));
		}
		return this._goToCourseHomepage();
	}

	_goToCourseHomepage(){
		// todo: actually redirect
		return this._entity && this._entity.organizationHomepageUrl();
	}
}


customElements.define('d2l-organization-completion-tracking', CompletionTracking);
