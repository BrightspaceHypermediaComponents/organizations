import '@brightspace-ui/core/components/alert/alert.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/inputs/input-checkbox.js';
import '@brightspace-ui/core/components/inputs/input-checkbox-spacer.js';

import { classMap } from 'lit-html/directives/class-map.js';
import { bodySmallStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { css, html, LitElement } from 'lit-element';

class CompletionTracking extends LitElement {

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
		`];
	}

	constructor() {
		super();
		this._initialValues = {
			isCompletionTracked: undefined,
			isProgressDisplayed: undefined
		};
		this._newValues = {};
	}

	render() {
		const isCompletionTracked = this._newValues.isCompletionTracked !== undefined ?
			this._newValues.isCompletionTracked :
			this._initialValues.isCompletionTracked;
		const showDisableWarning = this._initialValues.isCompletionTracked && this._newValues.isCompletionTracked === false;
		const completionHelpClasses = {
			'd2l-body-small': true,
			'd2l-hidden': this._initialValues.isCompletionTracked
		};
		const progressTrackingClasses = {
			'd2l-subfield': true,
			'd2l-hidden': !this._showProgressTracking
		};
		return html`
			<h1>mainTitle</h1>
			<div class="compact">
				<p>mainDesc</p>
			</div>
			<h3>subTitle</h3>
			<d2l-input-checkbox
				?checked="${isCompletionTracked}"
				@change="${this._onTrackingChange}">checkbox label</d2l-input-checkbox>
			<d2l-input-checkbox-spacer class="${classMap(completionHelpClasses)}">
			enableWarning
			</d2l-input-checkbox-spacer>
			<br/>
			<d2l-alert type="warning" ?hidden="${!showDisableWarning}">
				Disable warning
			</d2l-alert>
			<div class="${classMap(progressTrackingClasses)}">
				<d2l-input-checkbox
					id="chkDisplayProgress"
					?disabled="${false}"
					?checked="${this._isProgressDisplayed}"
					@change="${this._onProgressChange}">
					displayProgressCheckboxLabel
				</d2l-input-checkbox>
				<d2l-input-checkbox-spacer class="d2l-body-small">
					displayProgressCheckboxSubText
				</d2l-input-checkbox-spacer>
			</div>
			<div class="d2l-button-container">
				<d2l-button
					id="btnSave"
					class="btnMargins"
					aria-label="Save and Close"
					@click="${this._onSaveClick}"
					primary
					?disabled=${!this._valuesChanged}>saveText</d2l-button>
				<d2l-button
					id="btnCancel"
					class="btnMargins"
					aria-label="cancelText"
					@click="${this._onCancelClick}">cancelText</d2l-button>
			</div>
			<br />
			<d2l-alert type="critical" ?hidden="${!this._error}">${this._error}</d2l-alert>
		`;
	}

	get _valuesChanged() {
		return this._initialValues.isCompletionTracked !== this._newValues.isCompletionTracked ||
			this._initialValues.isProgressDisplayed !== this._newValues.isProgressDisplayed;
	}

	_onProgressChange(e) {
		this._newValues.isProgressDisplayed = e.target.checked;
	}

	_onTrackingChange(e) {
		this._showProgressTracking = e.target.checked;
		this._newValues.isCompletionTracked = e.target.checked;
	}

	_onCancelClick() {
		// todo: redirect
	}

	_onSaveClick() {

		if (this._initialValues.isCompletionTracked !== this._newValues.isCompletionTracked) {
			// todo: save completion tracking
		}

		if (this._initialValues.isProgressDisplayed !== this._newValues.isProgressDisplayed) {
			// todo: save progress display
		}
		// todo: redirect
	}
}

customElements.define('d2l-organization-completion-tracking', CompletionTracking);
