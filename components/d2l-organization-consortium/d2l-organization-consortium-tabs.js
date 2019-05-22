/**
`d2l-organization-name`

Polymer-based web component for displaying all organizations a user is enrolled in for a consortium

@demo demo/d2l-organization-consortium/d2l-organization-consortium.html organization consortium tab
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/mixin/entity-mixin.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';

import 'd2l-tabs/d2l-tabs.js';
import 'd2l-tabs/d2l-tab-panel.js';

import  { ConsortiumEntityMock } from './consortium-entity-mock.js'; //todo move to siren-sdk
import '../d2l-organization-behavior.js';

/**
 * @customElement
 * @polymer
 */
class OrganizationConsortiumTabs extends mixinBehaviors([
	D2L.PolymerBehaviors.Organization.Behavior
], EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(ConsortiumEntityMock);
	}

	static get template() {
		return html`
		<d2l-tabs>
			<template items="[[organizations]]" is="dom-repeat">
				<d2l-tab-panel text="[[item.name]]" selected$="[[_isSelected(item)]]" on-d2l-tab-panel-selected="_navigate"></d2l-tab-panel>
			</template>
		</d2l-tabs>
		`;
	}
	_navigate(e) {
		if (!this._isSelected(e.model.item)) {
			window.location = e.model.item.organizationHomepageUrl;
		}
	}
	_isSelected(organization) {
		const windowHost = new URL(window.location).host;
		const orgHost = new URL(organization.organizationHomepageUrl).host;

		return windowHost === orgHost;
	}

	static get properties() {
		return {
			organizations: {
				type: Array,
				value: [
					{
						name: 'D2L',
						organizationHomepageUrl: 'https://www.d2l.com'
					},
					{
						name: 'Brightspace Community',
						organizationHomepageUrl: 'https://community.brightspace.com/s/'

					},
					{
						name: 'demo page',
						organizationHomepageUrl: 'http://localhost:8081/components/d2l-organizations/demo/d2l-organization-consortium/d2l-organization-consortium.html'
					},
					{
						name: 'other demo page',
						organizationHomepageUrl: 'http://127.0.0.1:8081/components/d2l-organizations/demo/d2l-organization-consortium/d2l-organization-consortium.html'
					}
				]
			}
		};
	}

	static get observers() {
		return [
		];
	}

	static get is() { return 'd2l-organization-consortium-tabs'; }

}

window.customElements.define(OrganizationConsortiumTabs.is, OrganizationConsortiumTabs);
