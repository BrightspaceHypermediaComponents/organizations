/**
`d2l-organization-consortium-tabs`

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
		<style>
			a {
				color: white;
				font-size: 12px;
				padding: 0px 5px;
				text-decoration: none;
			}
			.tab {
				background: rgb(0,0,0,.4);
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				line-height: 17px;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-break: break-all;
			}
			#selected {
				background: white;
			}
			#selected > a {
				color: grey;
			}
			#tabBox {
				display: flex;
				flex-wrap: nowrap;
			}
		</style>
		<div id="tabBox">
			<template items="[[parsedOrganizations]]" is="dom-repeat" sort="_sortOrder">
				<div class="tab" id$="[[_isSelected(item)]]">
					<a href="[[item.href]]">[[item.name]]</a>
				</div>
			</template>
		</div>
		`;
	}
	_isSelected(item) {
		return item.name === 'c1' ? 'selected' : false;
	}
	_sortOrder(item1, item2) {
		return item1.name.localeCompare(item2.name);
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
				href: currentOrganizations[key]
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
