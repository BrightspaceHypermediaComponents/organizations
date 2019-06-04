/**
`d2l-organization-name`

Polymer-based web component for displaying all organizations a user is enrolled in for a consortium

@demo demo/d2l-organization-consortium/d2l-organization-consortium.html organization consortium tab
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';

import { ConsortiumTokenCollectionEntity } from 'siren-sdk/src/consortium/ConsortiumTokenCollectionEntity.js';
import '../d2l-organization-behavior.js';

/**
 * @customElement
 * @polymer
 */
class OrganizationConsortiumTabs extends EntityMixin(PolymerElement) {
	constructor() {
		super();
		this._setEntityType(ConsortiumTokenCollectionEntity);
	}

	static get template() {
		return html`
		<template items="[[parsedOrganizations]]" is="dom-repeat">
			<a href="[[item.value]]">[[item.name]]</a>
		</template>
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

	_onConsortiumChange(consotriumTokenCollection) {
		consotriumTokenCollection.consortiumTokenEntities((consortiumEntity) => {
			consortiumEntity.rootOrganizationEntity((rootEntity) => {
				rootEntity.organization((orgEntity) => {
					this.set(`organizations.${orgEntity.code() || orgEntity.name()}`, orgEntity.fullyQualifiedOrganizationHomepageUrl());
				});
			});
		});
	}

	static get observers() {
		return [
			'_onConsortiumChange(_entity)'
		];
	}

	_computeParsedOrganizations() {
		const currentOrganizations = this.organizations;
		return Object.keys(currentOrganizations).map(function(key) {
			return {
				name: key,
				value: currentOrganizations[key]
			};
		});
	}

	static get properties() {
		return {
			organizations: {
				type: Object,
				value: {},
				notify: true
			},
			parsedOrganizations: {
				type: Array,
				computed: '_computeParsedOrganizations(organizations.*)'
			}
		};
	}

	static get is() { return 'd2l-organization-consortium-tabs'; }

}

window.customElements.define(OrganizationConsortiumTabs.is, OrganizationConsortiumTabs);
