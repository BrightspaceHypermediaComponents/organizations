/**
`d2l-organization-date`
Polymer-based web component for a organization date such as start and end date for a course.
@demo demo/d2l-organization-date/d2l-organization-date-demo.html Organization Name
*/

import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { OrganizationEntity } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import '../d2l-organization-behavior.js';
import './localize-behavior.js';

/**
 * @customElement
 * @polymer
 */
class OrganizationDate extends mixinBehaviors([
	D2L.PolymerBehaviors.Organization.Date.LocalizeBehavior,
	D2L.PolymerBehaviors.Organization.Behavior
], EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}
	static get template() {
		return html`
            <span hidden$="[[!_statusText]]">[[_statusText]]</span>
		`;
	}

	static get properties() {
		return {
			hideCourseStartDate: {
				type: Boolean,
				value: false
			},
			hideCourseEndDate: {
				type: Boolean,
				value: false
			},
			_statusText: {
				type: String,
				value: null
			},
			_entityStatus: String
		};
	}

	static get observers() {
		return [
			'_getOrganizationDate(_entity)',
			'_setOrganizationDate(hideCourseStartDate, hideCourseEndDate)',
			'_sendVoiceReaderInfo(_statusText)'
		];
	}

	static get is() {
		return 'd2l-organization-date';
	}

	_getOrganizationDate(organization) {
		if (!organization) {
			return;
		}

		this._entityStatus = organization.isActive();
		this._setOrganizationDate(this.hideCourseStartDate, this.hideCourseEndDate);
	}

	_setOrganizationDate(hideCourseStartDate, hideCourseEndDate) {
		var date = this._entity && this._entity.processedDate(hideCourseStartDate, hideCourseEndDate);
		if (!date) {
			return;
		}

		this._statusText = this.localize(
			date.type,
			'date', this.formatDate(date.date, {format: 'MMMM d, yyyy'}),
			'time', this.formatTime(date.date)
		);

		if (this._statusText || (this._entityStatus !== undefined)) {
			this.fire('d2l-organization-date', {
				active: !!this._entityStatus,
				beforeStartDate: date.beforeStartDate,
				afterEndDate: date.afterEndDate
			});
		}
	}

	_sendVoiceReaderInfo(statusText) {
		if (!statusText) {
			return;
		}

		var details = {
			organization: {
				date: statusText
			},
		};
		this._fireD2lOrganizationAccessible(details);
	}
}

window.customElements.define(OrganizationDate.is, OrganizationDate);
