import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/dialog/dialog.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';

import { css, html, LitElement } from 'lit-element';

import { classMap } from 'lit-html/directives/class-map.js';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';

import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { OrganizationEntity } from 'siren-sdk/src/organizations/OrganizationEntity.js';

import { LocalizeOrganizationCompletion } from './localization.js';

class CompletionTracking extends EntityMixinLit(LocalizeOrganizationCompletion(LitElement)) {

	static get properties() {
		return {
			_error: { type: String },
			_trackCompletion: { type: Boolean },
			_displayProgress: { type: Boolean },
			_isLoaded: { type: Boolean },
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
		this._isLoaded = false;
		this._setEntityType(OrganizationEntity);
	}

	get _entity() {
		return super._entity;
	}

	set _entity(entity) {
		if (entity && this._entityHasChanged(entity, this._entity)) {
			entity.subEntitiesLoaded().then(() => {
				super._entity = entity;
				this._trackCompletion = this._entity.isCompletionTracked();
				this._displayProgress = this._entity.isProgressDisplayed();
				this._isLoaded = true;
			});
		}
	}

	render() {
		if (!this._isLoaded) {
			return html``;
		}

		const isCompletionTracked = this._trackCompletion;
		const isProgressDisplayed = this._displayProgress;

		const showDisableWarning = this._entity.isCompletionTracked() && this._trackCompletion === false;
		const showProgressTracking = this._trackCompletion;
		const completionHelpClasses = {
			'd2l-body-small': true,
			'd2l-hidden': isCompletionTracked
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
				<d2l-button slot="footer" primary data-dialog-action="yes" id="confirmDisableButton">${this.localize('dlgDisablePositiveButtonText')}</d2l-button>
				<d2l-button slot="footer" data-dialog-action id="denyDisableButton">${this.localize('dlgDisableNegativeButtonText')}</d2l-button>
			</d2l-dialog>
		`;
	}

	get _valuesChanged() {
		return this._trackCompletion !== this._entity.isCompletionTracked() ||
			this._displayProgress !== this._entity.isProgressDisplayed();
	}

	async _confirmDisable() {
		const action = await this.shadowRoot.querySelector('#confirmDisableDialog').open();
		return action === 'yes';
	}

	_onProgressChange(e) {
		this._displayProgress = e.target.checked;
	}

	_onTrackingChange(e) {
		this._trackCompletion = e.target.checked;
		this._showProgressTracking = e.target.checked;

		// turn on progress display by default
		if (e.target.checked) {
			this._displayProgress = true;
		} else {
			this._displayProgress = false;
		}
	}

	_onCancelClick() {
		this._goToAdminPage();
	}

	async _onSaveClick() {
		// Save checkboxes state that needs to be applied so it will not be updated by entity state changes applied during update
		const trackCompletion = this._trackCompletion;
		const displayProgress = this._displayProgress;

		if (trackCompletion !== this._entity.isCompletionTracked && (trackCompletion || await this._confirmDisable())) {
			await this._entity.updateCompletionTracking(trackCompletion);
		}

		if (displayProgress !== this._entity.isProgressDisplayed()) {
			await this._entity.updateDisplayProgress(displayProgress);
		}

		this._goToAdminPage();
	}

	_setWindowLocation(location) {
		window.location = location;
	}

	_goToAdminPage() {
		// TODO: implement Organizations HM Api to return proper link for admin page
		const orgUnitId = this._orgID;
		if (orgUnitId !== undefined) {
			this._setWindowLocation('/d2l/lp/cmc/main.d2l?ou=' + orgUnitId);
		}
	}

	get _orgID() {
		const homepageRel = 'https://api.brightspace.com/rels/organization-homepage';
		const sirenEntity = this._entity._entity;
		if (sirenEntity && sirenEntity.hasLinkByRel(homepageRel)) {
			const homepageUrl = sirenEntity.getLinkByRel(homepageRel).href;
			return homepageUrl.substring(homepageUrl.lastIndexOf('/') + 1);
		}
	}
}

customElements.define('d2l-organization-completion-tracking', CompletionTracking);
