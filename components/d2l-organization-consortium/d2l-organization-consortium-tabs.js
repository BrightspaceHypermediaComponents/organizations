/**
`d2l-organization-consortium-tabs`

Polymer-based web component for displaying all organizations a user is enrolled in for a consortium

@demo demo/d2l-organization-consortium/d2l-organization-consortium.html organization consortium tab
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { ConsortiumRootEntity } from 'siren-sdk/src/consortium/ConsortiumRootEntity.js';
import { ConsortiumTokenCollectionEntity } from 'siren-sdk/src/consortium/ConsortiumTokenCollectionEntity.js';
import { updateEntity } from 'siren-sdk/src/es6/EntityFactory.js';
window.D2L.Siren.WhitelistBehavior._testMode(true);
import '../d2l-organization-behavior.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory';
import 'd2l-navigation/d2l-navigation-notification-icon.js';

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
			pollIntervalInSeconds: {
				type: Number,
				value: 300
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
			.d2l-tab-container {
				display: inline-block;
				position: relative;
			}
		</style>
		<div class="d2l-consortium-tab-box">
			<template items="[[_parsedOrganizations]]" is="dom-repeat" sort="_sortOrder">
				<span class="d2l-tab-container">
					<div class="d2l-consortium-tab" id$="[[item.id]]" selected$="[[_isSelected(item)]]">
						<a href="[[item.href]]" aria-label$="[[item.fullName]]">[[item.name]]</a>
						<d2l-navigation-notification-icon hidden$="[[!item.hasNotification]]"></d2l-navigation-notification-icon>
					</div>
				</span>
				<d2l-tooltip class="consortium-tab-tooltip" for="[[item.id]]" position="top">
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
			entityFactory(ConsortiumTokenCollectionEntity, rootEntity.getConsortiumCollection().href, _self._token, (changed) => _self._onConsortiumChange(changed), entity);
		});
	}

	_onConsortiumChange(consotriumTokenCollection) {
		console.log(consotriumTokenCollection);
		this._resetMaps();
		this.__tokenCollection = consotriumTokenCollection;
		consotriumTokenCollection.consortiumTokenEntities((consortiumEntity) => {
			console.log(consortiumEntity);
			consortiumEntity.rootOrganizationEntity((rootEntity) => {
				rootEntity.organization((orgEntity) => {
					const key = orgEntity.code() || orgEntity.name();
					this.set(`_organizations.${key}`, {
						name: orgEntity.name(),
						code: orgEntity.code(),
						href: orgEntity.fullyQualifiedOrganizationHomepageUrl(),
						unread: this._organizations[key] && this._organizations[key].unread
					});

					if (orgEntity.alertsUrl() && consortiumEntity.consortiumToken()) {
						this._alertTokensMap[orgEntity.alertsUrl()] = consortiumEntity.consortiumToken();
					}

					orgEntity.onAlertsChange(alertsEntity => {
						const unread = alertsEntity.hasUnread();
						this.set(`_organizations.${key}`, {
							name: orgEntity.name(),
							code: orgEntity.code(),
							href: orgEntity.fullyQualifiedOrganizationHomepageUrl(),
							unread: unread
						});
					});
				});
			});
		});
	}

	_resetMaps(){
		this.set('_organizations', {});
		this.set('_alertTokensMap', {});
	}

	_computeParsedOrganizations() {
		const currentOrganizations = this._organizations;
		return Object.keys(currentOrganizations).map(function(key) {
			const org = {
				id: D2L.Id.getUniqueId(),
				name: key,
				fullName: currentOrganizations[key].name,
				href: currentOrganizations[key].href,
				hasNotification: currentOrganizations[key].unread
			};
			return org;
		});
	}
}

window.customElements.define(OrganizationConsortiumTabs.is, OrganizationConsortiumTabs);
