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
import 'd2l-loading-spinner/d2l-loading-spinner.js';
import { ConsortiumRootEntity } from 'siren-sdk/src/consortium/ConsortiumRootEntity.js';
import { ConsortiumTokenCollectionEntity } from 'siren-sdk/src/consortium/ConsortiumTokenCollectionEntity.js';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { updateEntity } from 'siren-sdk/src/es6/EntityFactory.js';

/**z
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
			_cache: {
				type:Object
			},

			_shouldRender: {
				type: Boolean,
				value: false
			},
			_organizations: {
				type: Object
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
			.d2l-consortium-tab-content {
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
				border-radius: 4px 4px 0 0;
				max-width: 5.5rem;
				padding: 0 0.6rem;
			}
			[selected] .d2l-consortium-tab {
				background: white;
			}
			[selected] .d2l-consortium-tab > .d2l-consortium-tab-content {
				color: var(--d2l-color-ferrite);
			}
			.d2l-consortium-tab-box {
				display: flex;
				flex-wrap: nowrap;
				max-height:0;
				overflow: hidden;
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
			.d2l-tab-container d2l-loading-spinner {
				vertical-align: middle;
			}
			.d2l-consortium-tab-growIn {
				max-height: 1.5rem;
				transform-origin: top;
				transition: max-height 500ms ease-in;
			}
			.d2l-consortium-tab-showTabs {
				max-height: 1.5rem;
			}

		</style>
		<div class$="d2l-consortium-tab-box [[_tabBoxClasses(_shouldRender, _cache)]]">
			<template items="[[_parsedOrganizations]]" is="dom-repeat" sort="_sortOrder" >
				<div class="d2l-tab-container" selected$="[[_isSelected(item)]]">
					<div class="d2l-consortium-tab" id$="[[item.id]]" >
					<template is="dom-if" if="[[!item.loading]]">
						<a href="[[item.href]]" class="d2l-consortium-tab-content " aria-label$="[[item.fullName]]">[[item.name]]</a>
						<d2l-navigation-notification-icon hidden$="[[!item.hasNotification]]"></d2l-navigation-notification-icon>
					</template>
					<template is="dom-if" if="[[item.loading]]">
							<d2l-loading-spinner size="16"></d2l-loading-spinner>
					</template>
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
	getCacheKey() {
		return `consortium-tabs-${this.token}`;
	}
	connectedCallback() {
		super.connectedCallback();
		this._intervalId = window.setInterval(this.updateAlerts.bind(this), this.pollIntervalInSeconds * 1000);
		this._cache = this._tryGetItemSessionStorage(this.getCacheKey());
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
	_tabBoxClasses(_shouldRender, _hasCache) {
		const classes = [];
		if (_hasCache) {
			classes.push('d2l-consortium-tab-showTabs');
		} else if (_shouldRender) {
			classes.push('d2l-consortium-tab-growIn');
		}
		return classes.join(' ');
	}
	_isSelected(item) {
		return this.selected === item.tenant;
	}
	_tryGetItemSessionStorage(itemName) {
		try {
			return JSON.parse(sessionStorage.getItem(itemName));
		} catch (_) {
			//noop if session storage isn't available or has bad data
			return;
		}
	}
	_trySetItemSessionStorage(itemName, value) {
		try {
			sessionStorage.setItem(itemName, value);
		} catch (_) {
			//noop we don't want to blow up if we exceed a quota or are in safari private browsing mode
		}
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
			const key = consortiumEntity.consortiumTenant();
			this._shouldRender = true;
			if (!this._cache || !this._cache[key]) {
				this.set(`_organizations.${key}`, {name:key, loading:true});
			}
			consortiumEntity.rootOrganizationEntity((rootEntity) => {
				rootEntity.organization((orgEntity) => {
					this.set(`_organizations.${key}`, {
						name: orgEntity.name(),
						code: orgEntity.code(),
						href: orgEntity.fullyQualifiedOrganizationHomepageUrl(),
						loading: false
					});

					if (orgEntity.alertsUrl() && consortiumEntity.consortiumToken()) {
						this._alertTokensMap[orgEntity.alertsUrl()] = consortiumEntity.consortiumToken();
					}
					this._trySetItemSessionStorage(this.getCacheKey(), JSON.stringify(Object.assign({}, this._cache, this._organizations)));
					orgEntity.onAlertsChange(alertsEntity => {
						const unread = alertsEntity.hasUnread();
						this.set(`_organizations.${key}.unread`, unread);
						this._trySetItemSessionStorage(this.getCacheKey(), JSON.stringify(Object.assign({}, this._cache, this._organizations)));
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
		const currentOrganizations = Object.assign({}, this._cache, this._organizations);
		const orgs = Object.keys(currentOrganizations).map(function(key) {
			const org = {
				id: D2L.Id.getUniqueId(),
				name: currentOrganizations[key].code || currentOrganizations[key].name,
				fullName: currentOrganizations[key].name,
				href: currentOrganizations[key].href,
				hasNotification: currentOrganizations[key].unread,
				tenant: key,
				loading: currentOrganizations[key].loading
			};
			return org;
		});
		return orgs.length >= this.tabRenderThreshold ? orgs : []; //don't render anything if we don't pass our render threshold
	}

}

window.customElements.define(OrganizationConsortiumTabs.is, OrganizationConsortiumTabs);
