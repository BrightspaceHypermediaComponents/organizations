/**
`d2l-organization-info`

Polymer-based web component for a organization info such as course code and semester name.

@demo demo/d2l-organization-info/d2l-organization-info-demo.html Organization Name
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import { Rels } from 'd2l-hypermedia-constants';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import '../d2l-organization-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-organization-info">
	<template strip-whitespace="">
		<style>
			d2l-icon {
				color: var(--d2l-color-tungsten);
				--d2l-icon-width: 18px;
				--d2l-icon-height: 18px;
			}
			d2l-icon[hidden] {
				display: none;
			}

			.uppercase {
				text-transform: uppercase;
			}

		</style>

		<span>
			<span hidden$="[[!_showOrganizationCode]]" class="uppercase">[[_organizationCode]]</span>
			<d2l-icon hidden$="[[!_showSeparator]]" icon="d2l-tier1:bullet"></d2l-icon>
			<span hidden$="[[!_showSemesterName]]">[[_semesterName]]</span>
		</span>
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-organization-info',

	properties: {
		href: String,
		presentationHref: String,

		_organization: Object,
		_organizationCode: String,
		_semesterName: String,
		_showOrganizationCode: {
			type: Boolean,
			value: false
		},
		_showSemesterName: {
			type: Boolean,
			value: false
		},
		_showSeparator: {
			type: Boolean,
			value: false,
			computed: '_computeShowSeparator(_showOrganizationCode, _showSemesterName, _organizationCode, _semesterName)'
		}
	},

	behaviors: [
		D2L.PolymerBehaviors.Organization.Behavior
	],

	observers: [
		'_fetchOrganization(href)',
		'_fetchPresentation(presentationHref)',
		'_fetchSemester(_organization, _showSemesterName)',
		'_sendVoiceReaderInfo(_showOrganizationCode, _showSemesterName, _organizationCode, _semesterName)'
	],
	_computeShowSeparator: function(showOrganizationCode, showSemester, organizationCode, semesterName) {
		return showSemester
			&& showOrganizationCode
			&& semesterName
			&& semesterName.length > 0
			&& organizationCode
			&& organizationCode.length > 0;
	},

	_fetchOrganization: function(organizationHref) {
		this._semesterName = null;
		this._organizationCode = null;
		return this._fetchSirenEntity(organizationHref)
			.then(function(organizationEntity) {
				this._statusTextEnded = null;
				this._statusTextFuture = null;
				this._statusTextInactive = null;

				if (!organizationEntity) {
					return;
				}
				this._organization = organizationEntity;

				if (!organizationEntity.properties) {
					return;
				}

				this._organizationCode = organizationEntity.properties.code;
			}.bind(this));
	},

	_fetchPresentation: function(presentationHref) {
		if (!presentationHref) {
			return Promise.resolve();
		}

		return this._fetchSirenEntity(presentationHref)
			.then(function(presentationEntity) {
				this._showOrganizationCode = presentationEntity
					&& presentationEntity.properties
					&& presentationEntity.properties.ShowCourseCode;
				this._showSemesterName = presentationEntity
					&& presentationEntity.properties
					&& presentationEntity.properties.ShowSemester;
			}.bind(this));
	},

	_fetchSemester: function(organization, showSemesterName) {
		if (!showSemesterName
			|| !organization
			|| !organization.hasLinkByRel(Rels.parentSemester)
		) {
			return Promise.resolve();
		}

		var semesterHref = organization.getLinkByRel(Rels.parentSemester).href;
		return this._fetchSirenEntity(semesterHref)
			.then(function(semesterEntity) {
				this._semesterName = semesterEntity
					&& semesterEntity.properties
					&& semesterEntity.properties.name;
			}.bind(this));
	},

	_sendVoiceReaderInfo: function(showOrganizationCode, showSemesterName, organizationCode, semesterName) {
		var details = {
			organization: {
				code: showOrganizationCode && organizationCode
			},
			semesterName: showSemesterName && semesterName
		};

		this._fireD2lOrganizationAccessible(details);
	},
});
