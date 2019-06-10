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

	static get is() { return 'd2l-organization-consortium-tabs'; }

	static get properties() {
		return {
			selected: {
				type: String,
				reflectToAttribute: true
			},
			_organizations: {
				type: Object,
				value: {}
			},
			_parsedOrganizations: {
				type: Array,
				computed: '_computeParsedOrganizations(_organizations.*)'
			}
		};
	}

	static get observers() {
		return [
			'_onConsortiumChange(_entity)'
		];
	}

	static get template() {
		return html`
		<style>
			a {
				color: white;
				font-size: 0.6rem;
				padding: 0px 5px;
				text-decoration: none;
			}
			.tab {
				background: rgb(0,0,0,.4);
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				line-height: 1.0625rem;
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
			<template items="[[_parsedOrganizations]]" is="dom-repeat" sort="_sortOrder">
				<div class="tab" id$="[[_isSelected(item)]]">
					<a href="[[item.href]]">[[item.name]]</a>
				</div>
			</template>
		</div>
		`;
	}

	constructor() {
		super();
		this._setEntityType(ConsortiumTokenCollectionEntity);
	}

	_isSelected(item) {
		return this.selected === item.name ? 'selected' : false;
	}

	_sortOrder(item1, item2) {
		return item1.name.localeCompare(item2.name);
	}

	_onConsortiumChange(consotriumTokenCollection) {
		consotriumTokenCollection.consortiumTokenEntities((consortiumEntity) => {
			consortiumEntity.rootOrganizationEntity((rootEntity) => {
				rootEntity.organization((orgEntity) => {
					this.set(`_organizations.${orgEntity.code() || orgEntity.name()}`, orgEntity.fullyQualifiedOrganizationHomepageUrl());
				});
			});
		});
	}

	_computeParsedOrganizations() {
		const currentOrganizations = this._organizations;
		return Object.keys(currentOrganizations).map(function(key) {
			return {
				name: key,
				href: currentOrganizations[key]
			};
		});
	}

}

window.customElements.define(OrganizationConsortiumTabs.is, OrganizationConsortiumTabs);
