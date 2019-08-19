/**
`d2l-organization-consortium-tabs`

Polymer-based web component for displaying all organizations a user is enrolled in for a consortium

@demo demo/d2l-organization-consortium/d2l-organization-consortium.html organization consortium tab
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../d2l-organization-behavior.js';
import 'd2l-navigation/d2l-navigation-notification-icon.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import { ConsortiumRootEntity } from 'siren-sdk/src/consortium/ConsortiumRootEntity.js';
import { ConsortiumTokenCollectionEntity } from 'siren-sdk/src/consortium/ConsortiumTokenCollectionEntity.js';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { updateEntity } from 'siren-sdk/src/es6/EntityFactory.js';

/**
 * @customElement
 * @polymer
 */
class OrganizationConsortiumTabs extends EntityMixin(PolymerElement) {

	static get is() { return 'd2l-organization-consortium-tabs'; }

	static get properties() {
		return {
			pollIntervalInSeconds: {
				type: Number,
				reflectToAttribute: true,
				value: 300
			},
			selected: {
				type: String,
				reflectToAttribute: true
			},
			tabRenderThreshold: {
				type: Number,
				reflectToAttribute: true,
				value: 2
			},
			_organizations: {
				type: Object,
				value: {}
			},
			_parsedOrganizations: {
				type: Array,
				computed: '_computeParsedOrganizations(_organizations.*)'
			},
			_intervalId: Number,
			_alertTokensMap: {
				type: Object,
				value: {}
			},
			__tokenCollection: {
				type: Object
			}
		};
	}

	static get observers() {
		return [
			'_onConsortiumRootChange(_entity)'
		];
	}

	static get template() {
		return html`
		<style include="d2l-typography-shared-styles">
			.d2l-consortium-tab a {
				@apply --d2l-body-small-text;
				color: white;
				display: inline-block;
				max-width: 100%;
				overflow: hidden;
				text-decoration: none;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-break: break-all;
				vertical-align: middle;
			}
			.d2l-consortium-tab {
				background: rgba(0, 0, 0, .54);
				border-bottom: none;
				border-radius: 0.20rem 0.20rem 0 0;
				max-width: 5.5rem;
				padding: 0 0.6rem;
			}
			[selected] .d2l-consortium-tab {
				background: white;
			}
			[selected] .d2l-consortium-tab > a {
				color: var(--d2l-color-ferrite);
			}
			.d2l-consortium-tab-box {
				display: flex;
				flex-wrap: nowrap;
			}
			.d2l-consortium-tab-box :not(:first-child) {
				margin-left: -1px;
			}
			.d2l-tab-container {
				border: rgba(255, 255, 255, .30) solid 1px;
				border-radius: 5px 5px 0 0;
				border-bottom: none;
				display: inline-block;
				line-height: 1rem;
				margin: 0.2rem 0 0 0;
				position: relative;
			}
			.d2l-tab-container[selected] {
				border: rgba(0, 0, 0, .42) solid 1px;
				border-bottom: none;
				z-index: 1;
			}

		</style>
		<div class="d2l-consortium-tab-box">
			<template items="[[_parsedOrganizations]]" is="dom-repeat" sort="_sortOrder">
				<div class="d2l-tab-container" selected$="[[_isSelected(item)]]">
					<div class="d2l-consortium-tab" id$="[[item.id]]" >
						<a href="[[item.href]]" aria-label$="[[item.fullName]]">[[item.name]]</a>
						<d2l-navigation-notification-icon hidden$="[[!item.hasNotification]]"></d2l-navigation-notification-icon>
					</div>
				</div>
				<d2l-tooltip class="consortium-tab-tooltip" for="[[item.id]]" position="bottom">
					[[item.fullName]]
				</d2l-tooltip>
			</template>
		</div>
		`;
	}

	constructor() {
		super();
		this._setEntityType(ConsortiumRootEntity);
	}

	connectedCallback() {
		super.connectedCallback();
		this._intervalId = window.setInterval(this.updateAlerts.bind(this), this.pollIntervalInSeconds * 1000);
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		window.clearInterval(this._intervalId);
		dispose(this.__tokenCollection);
	}

	updateAlerts() {
		for (var key in this._alertTokensMap) {
			if (this._alertTokensMap.hasOwnProperty(key)) {
				updateEntity(key, this._alertTokensMap[key]);
			}
		}
	}

	_isSelected(item) {
		return this.selected === item.name;
	}

	_sortOrder(item1, item2) {
		return item1.name.localeCompare(item2.name);
	}

	_onConsortiumRootChange(rootEntity) {
		var _self = this;
		this.performSirenAction(rootEntity.getConsortiumCollection(), null, true).then((entity) => {
			dispose(_self.__tokenCollection); //clean up the old one
			this._resetMaps();
			entityFactory(ConsortiumTokenCollectionEntity, rootEntity.getConsortiumCollection().href, _self._token, (changed) => _self._onConsortiumChange(changed), entity);
		});
	}

	_onConsortiumChange(consotriumTokenCollection) {
		this.__tokenCollection = consotriumTokenCollection;
		consotriumTokenCollection.consortiumTokenEntities((consortiumEntity) => {
			consortiumEntity.rootOrganizationEntity((rootEntity) => {
				rootEntity.organization((orgEntity) => {
					const key = orgEntity.code() || orgEntity.name();
					this.set(`_organizations.${key}`, {
						name: orgEntity.name(),
						code: orgEntity.code(),
						href: orgEntity.fullyQualifiedOrganizationHomepageUrl()
					});

					if (orgEntity.alertsUrl() && consortiumEntity.consortiumToken()) {
						this._alertTokensMap[orgEntity.alertsUrl()] = consortiumEntity.consortiumToken();
					}

					orgEntity.onAlertsChange(alertsEntity => {
						const unread = alertsEntity.hasUnread();
						this.set(`_organizations.${key}.unread`, unread);
					});
				});
			});
		});
	}

	_resetMaps() {
		this.set('_organizations', {});
		this.set('_alertTokensMap', {});
	}

	_computeParsedOrganizations() {
		const currentOrganizations = this._organizations;
		const orgs = Object.keys(currentOrganizations).map(function(key) {
			const org = {
				id: D2L.Id.getUniqueId(),
				name: key,
				fullName: currentOrganizations[key].name,
				href: currentOrganizations[key].href,
				hasNotification: currentOrganizations[key].unread
			};
			return org;
		});
		return orgs.length >= this.tabRenderThreshold ? orgs : []; //don't render anything if we don't pass our render threshold
	}

}

window.customElements.define(OrganizationConsortiumTabs.is, OrganizationConsortiumTabs);
