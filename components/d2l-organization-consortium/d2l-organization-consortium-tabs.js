/**
`d2l-organization-consortium-tabs`

Polymer-based web component for displaying all organizations a user is enrolled in for a consortium

@demo demo/d2l-organization-consortium/d2l-organization-consortium.html organization consortium tab
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';

import { ConsortiumTokenCollectionEntity } from 'siren-sdk/src/consortium/ConsortiumTokenCollectionEntity.js';
import '../d2l-organization-behavior.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-polymer-behaviors/d2l-id.js';

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

			div[selected] {
				background: white;
			}
			div[selected] > a {
				color: grey;
			}
			.d2l-consortium-tab {
				background: rgb(0,0,0,.4);
				border-top-left-radius: 5px;
				border-top-right-radius: 5px;
				line-height: 1.0625rem;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-break: break-all;
			}
			.d2l-consortium-tab-box {
				display: flex;
				flex-wrap: nowrap;
			}
		</style>
		<div class="d2l-consortium-tab-box">
			<template items="[[_parsedOrganizations]]" is="dom-repeat" sort="_sortOrder">
				<div class="d2l-consortium-tab" id$="[[item.id]]" selected$="[[_isSelected(item)]]">
					<a href="[[item.href]]" aria-label$="[[item.fullName]]">[[item.name]]</a>
				</div>
				<d2l-tooltip class="consortium-tab-tooltip" for="[[item.id]]" position="top">
					[[item.fullName]]
				</d2l-tooltip>
			</template>
		</div>
		`;
	}

	constructor() {
		super();
		this._setEntityType(ConsortiumTokenCollectionEntity);
	}

	_isSelected(item) {
		return this.selected === item.name;
	}

	_sortOrder(item1, item2) {
		return item1.name.localeCompare(item2.name);
	}

	_onConsortiumChange(consotriumTokenCollection) {
		consotriumTokenCollection.consortiumTokenEntities((consortiumEntity) => {
			consortiumEntity.rootOrganizationEntity((rootEntity) => {
				rootEntity.organization((orgEntity) => {
					this.set(`_organizations.${orgEntity.code() || orgEntity.name()}`, {
						name: orgEntity.name(),
						code: orgEntity.code(),
						href: orgEntity.fullyQualifiedOrganizationHomepageUrl()
					});
				});
			});
		});
	}

	_computeParsedOrganizations() {
		const currentOrganizations = this._organizations;
		return Object.keys(currentOrganizations).map(function(key) {
			return {
				id: D2L.Id.getUniqueId(),
				name: key,
				fullName: currentOrganizations[key].name,
				href: currentOrganizations[key].href
			};
		});
	}

}

window.customElements.define(OrganizationConsortiumTabs.is, OrganizationConsortiumTabs);
