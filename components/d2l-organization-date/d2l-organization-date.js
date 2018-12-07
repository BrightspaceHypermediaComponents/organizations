/**
`d2l-organization-date`

Polymer-based web component for a organization date such as start and end date for a course.

@demo demo/d2l-organization-date/d2l-organization-date-demo.html Organization Name
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '../d2l-organization-behavior.js';
import './localize-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-organization-date">
	<template strip-whitespace="">
		<span hidden$="[[!_statusText]]">[[_statusText]]</span>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-organization-date',

	properties: {
		href: String,

		_statusText: String
	},

	behaviors: [
		D2L.PolymerBehaviors.Organization.Date.LocalizeBehavior,
		D2L.PolymerBehaviors.Organization.Behavior
	],

	observers: [
		'_fetchOrganizationDate(href)',
		'_sendVoiceReaderInfo(_statusText)'
	],

	_fetchOrganizationDate: function(organizationHref) {
		return this._fetchSirenEntity(organizationHref)
			.then(function(organizationEntity) {
				this._statusText = null;

				if (!organizationEntity) {
					return;
				}

				if (!organizationEntity.properties) {
					return;
				}

				var nowDate = Date.now();
				var endDate = Date.parse(organizationEntity.properties.endDate);
				var startDate = Date.parse(organizationEntity.properties.startDate);

				if (startDate > nowDate) {
					startDate = new Date(startDate);
					this._statusText = this.localize('startsAt', 'date', this.formatDate(startDate, {format: 'MMMM d, yyyy'}), 'time', this.formatTime(startDate));

				} else if (endDate < nowDate) {
					endDate = new Date(endDate);
					this._statusText = this.localize('ended', 'date', this.formatDate(endDate, {format: 'MMMM d, yyyy'}), 'time', this.formatTime(endDate));

				} else if (endDate >= nowDate) {
					endDate = new Date(endDate);
					this._statusText = this.localize('endsAt', 'date', this.formatDate(endDate, {format: 'MMMM d, yyyy'}), 'time', this.formatTime(endDate));
				}

				if (this._statusText || !organizationEntity.properties.isActive) {
					this.fire('d2l-organization-date', {
						active: !!organizationEntity.properties.isActive,
						beforeStartDate: startDate ? startDate > nowDate : null,
						afterEndDate: endDate ? endDate <= nowDate : null
					});
				}

			}.bind(this));
	},

	_sendVoiceReaderInfo: function(statusText) {
		if (!statusText) {
			return;
		}

		var details = {
			organization: {
				date: statusText
			},
		};

		this._fireD2lOrganizationAccessible(details);
	},
});
