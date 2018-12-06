/**
`d2l-organization-name`

Polymer-based web component for a organization name.

@demo demo/d2l-organization-name/d2l-organization-name-demo.html Organization Name
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '../d2l-organization-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-organization-name">
	<template strip-whitespace="">
		[[_organizationName]]
	</template>

	
</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-organization-name',

	properties: {
		href: String,

		_organizationName: String
	},

	behaviors: [
		D2L.PolymerBehaviors.Organization.Behavior
	],

	observers: [
		'_fetchOrganization(href)',
		'_sendVoiceReaderInfo(_organizationName)'
	],

	_fetchOrganization: function(organizationHref) {
		return this._fetchSirenEntity(organizationHref)
			.then(function(organizationEntity) {
				if (!organizationEntity) {
					return;
				}

				if (!organizationEntity.properties) {
					return;
				}

				this._organizationName = organizationEntity.properties.name;
			}.bind(this));
	},

	_sendVoiceReaderInfo: function(organizationName) {
		var details = {
			organization: {
				name: organizationName
			}
		};

		this._fireD2lOrganizationAccessible(details);
	},
});
