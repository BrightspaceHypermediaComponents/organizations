/**
`d2l-organization-consortium-tabs`

Polymer-based web component for displaying all organizations a user is enrolled in for a consortium

@demo demo/d2l-organization-consortium/d2l-organization-consortium.html organization consortium tab
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../d2l-organization-behavior.js';
import 'd2l-navigation/d2l-navigation-notification-icon.js';
import 'd2l-polymer-behaviors/d2l-id.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-tooltip/d2l-tooltip.js';
import 'fastdom/fastdom.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/icons/icon.js';
import '@brightspace-ui/core/components/offscreen/offscreen.js';
import { ConsortiumRootEntity } from 'siren-sdk/src/consortium/ConsortiumRootEntity.js';
import { ConsortiumTokenCollectionEntity } from 'siren-sdk/src/consortium/ConsortiumTokenCollectionEntity.js';
import { entityFactory, dispose } from 'siren-sdk/src/es6/EntityFactory';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { updateEntity } from 'siren-sdk/src/es6/EntityFactory.js';
import { OrganizationConsortiumLocalize } from './organization-consortium-localize.js';

/**
 * @customElement
 * @polymer
 */
class OrganizationConsortiumTabs extends EntityMixin(OrganizationConsortiumLocalize(PolymerElement)) {

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
			_errors: {
				type:Array,
				value: function() {
					return [];
				}
			},
			_shouldRender: {
				type: Boolean,
				value: false
			},
			_requestedScrollTimeoutId: {
				type: Number
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
				value: function() {
					return {};
				}
			},
			_hasNotifications: {
				type: Boolean,
				value: false
			},
			__tokenCollection: {
				type: Object
			},
			__errorId: {
				type: String,
				value: D2L.Id.getUniqueId()
			}
		};
	}

	static get observers() {
		return [
			'_setCache(token)',
			'_onConsortiumRootChange(_entity)',
			'_checkNotifications(_parsedOrganizations.*)'
		];
	}

	static get template() {
		return html`
		<style include="d2l-typography-shared-styles">

			.d2l-consortium-tab-box {
				display: flex;
				flex-wrap: nowrap;
				max-height: 0;
				overflow-x: unset;
				overflow-y: hidden;
			}
			.d2l-consortium-tab-growIn {
				max-height: 1.5rem;
				transform-origin: top;
				transition: max-height 500ms ease-in;
			}
			.d2l-consortium-tab-showTabs {
				max-height: 1.5rem;
			}

			.d2l-tab-container {
				border: 1px solid rgba(255, 255, 255, .30);
				border-radius: 6px 6px 0 0;
				border-bottom: none;
				display: inline-block;
				margin: 4px 0 0 -1px;
				position: relative;
			}
			:host(:dir(rtl)) .d2l-tab-container {
				margin-left: 0;
				margin-right: -1px;
			}
			.d2l-tab-container:first-child {
				margin-left: 0;
				margin-right: 0;
			}
			.d2l-tab-container:hover {
				border-color: rgba(255, 255, 255, .60);
				border-bottom: none;
			}
			.d2l-tab-container[selected] {
				border-color: rgba(0, 0, 0, .42);
				border-bottom: none;
				z-index: 1;
			}

			.d2l-consortium-tab {
				background-color: rgba(0, 0, 0, .54);
				border-bottom: none;
				border-radius: 5px 5px 0 0;
				display: block;
				max-width: 5.5rem;
				outline: none;
				padding: 0 0.6rem;
			}
			@media (max-width: 767px) {
				.d2l-consortium-tab {
					padding: 0 0.5rem;
				}
			}
			.d2l-consortium-tab:hover {
				background-color: rgba(0, 0, 0, .70);
			}
			.d2l-consortium-tab:focus {
				box-shadow: inset 0 0 0 2px rgba(0, 0, 0, .54),
							inset 0 0 0 2px var(--d2l-branding-primary-color, var(--d2l-color-celestine)),
							inset 0 0 0 4px #ffffff;
			}
			[selected] .d2l-consortium-tab {
				background-color: white;
			}

			.d2l-consortium-tab-content {
				@apply --d2l-body-small-text;
				color: #ffffff;
				cursor: pointer;
				display: inline-block;
				line-height: 1.25rem;
				max-width: 100%;
				overflow: hidden;
				text-decoration: none;
				text-overflow: ellipsis;
				white-space: nowrap;
				word-break: break-all;
				vertical-align: middle;
			}
			[selected] .d2l-consortium-tab-content {
				color: var(--d2l-color-ferrite);
				cursor: default;
			}
			.d2l-consortium-tab-content.d2l-consortium-tab-error,
			.d2l-consortium-tab-content.d2l-consortium-tab-loading {
				cursor: default;
			}
			.d2l-consortium-tab-content d2l-icon {
				--d2l-icon-fill-color: #ffffff;
				padding-right: 6px;
				vertical-align: middle;
			}
			:host(:dir(rtl)) .d2l-consortium-tab-content d2l-icon {
				padding-left: 6px;
				padding-right: 0;
			}

			d2l-navigation-notification-icon {
				pointer-events: none;
				right: -1px;
				top: -1px;
				width: auto;
			}
			:host(:dir(rtl)) d2l-navigation-notification-icon {
				left: -1px;
				right: auto;
			}
		</style>
		<div class$="d2l-consortium-tab-box [[_tabBoxClasses(_shouldRender, _cache)]]">
			<template items="[[_parsedOrganizations]]" is="dom-repeat" sort="_sortOrder" >
				<div class="d2l-tab-container" selected$="[[_isSelected(item)]]">
					<template is="dom-if" if="[[!item.loading]]">
						<a class="d2l-consortium-tab" id$="[[item.id]]" href$="[[_getTabHref(item)]]" aria-label$="[[_getTabAriaLabel(item)]]"><div class="d2l-consortium-tab-content">[[item.name]]</div></a>
						<d2l-navigation-notification-icon hidden$="[[!_checkOrgNotification(item)]]" thin-border></d2l-navigation-notification-icon>
					</template>
					<template is="dom-if" if="[[item.loading]]">
						<div class="d2l-consortium-tab" id$="[[item.id]]">
							<div class="d2l-consortium-tab-content d2l-consortium-tab-loading" aria-label$="[[localize('loading')]]">...</div>
						</div>
					</template>
				</div>

				<d2l-tooltip class="consortium-tab-tooltip" for="[[item.id]]" delay="500" position="bottom">[[_successfulTabToolTipText(item)]]</d2l-tooltip>
			</template>
			<template is="dom-if" if="[[_hasErrors(_errors)]]">
				<div class="d2l-tab-container">
					<div class="d2l-consortium-tab" tabindex="0" id="[[__errorId]]">
						<div class="d2l-consortium-tab-content d2l-consortium-tab-error">
							<d2l-icon icon="tier1:alert"></d2l-icon>[[localize('errorShort')]]<d2l-offscreen>[[localize('errorFull', 'num', _errors.length)]]</d2l-offscreen>
						</div>
					</div>
				</div>

				<d2l-tooltip class="consortium-tab-tooltip" for="[[__errorId]]" delay="500" position="bottom">[[localize('errorFull','num', _errors.length)]]</d2l-tooltip>
			</template>
		</div>
		`;
	}

	constructor() {
		super();
		this._setEntityType(ConsortiumRootEntity);
		this._requestScroll = this._requestScroll.bind(this);
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
	tryRequestScroll() {
		fastdom.measure(() => {
			if (!this._requestedScrollTimeoutId && this.getBoundingClientRect().width > 0) {
				this._requestedScrollTimeoutId = setTimeout(this._requestScroll, 1000);
			}
		});
	}

	_requestScroll() {
		var selectedTab = this.shadowRoot.querySelector('.d2l-tab-container[selected]');
		if (!selectedTab) {
			return;
		}
		fastdom.measure(() => {
			var distanceToCenter = selectedTab.offsetLeft + (selectedTab.offsetWidth / 2);
			this.dispatchEvent(
				new CustomEvent(
					'd2l-navigation-band-slot-scroll-request',
					{
						detail: {
							pointToCenter: distanceToCenter
						},
						bubbles: true,
						composed: true
					}
				)
			);
		});
	}

	async _getCacheKey() {
		if (typeof (this.token) === 'function') {
			const token = await this.token();
			return `consortium-tabs-${token}`;
		} else {
			return `consortium-tabs-${this.token}`;
		}
	}

	async _setCache(token) {
		if (!token) {
			return;
		}
		const cacheKey = await this._getCacheKey();
		this._cache = this._tryGetItemSessionStorage(cacheKey);
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
			const itemCopied = JSON.parse(JSON.stringify(value));
			for (const errorKey of this._computeErrors(itemCopied)) {
				delete itemCopied[errorKey];
			}
			sessionStorage.setItem(itemName, JSON.stringify(itemCopied));
		} catch (_) {
			//noop we don't want to blow up if we exceed a quota or are in safari private browsing mode
		}
	}
	_sortOrder(item1, item2) {
		if (item1 && item1.name && item2 && item2.name) {
			return item1.name.localeCompare(item2.name);
		}
		return 0;
	}

	_onConsortiumRootChange(rootEntity) {
		var _self = this;
		if (rootEntity && rootEntity.getConsortiumCollection()) {
			this.performSirenAction(rootEntity.getConsortiumCollection(), null, true).then((entity) => {
				dispose(_self.__tokenCollection); //clean up the old one
				this._resetMaps();
				entityFactory(ConsortiumTokenCollectionEntity, rootEntity.getConsortiumCollection().href, _self._token, (changed) => _self._onConsortiumChange(changed), entity);
			});
		}
	}

	_onConsortiumChange(consortiumTokenCollection) {
		this.__tokenCollection = consortiumTokenCollection;
		consortiumTokenCollection.consortiumTokenEntities((consortiumEntity) => {
			const key = consortiumEntity.consortiumTenant();
			this._shouldRender = true;
			if (!this._cache || !this._cache[key]) {
				this.set(`_organizations.${key}`, {name:key, loading:true});
			}

			consortiumEntity.rootOrganizationEntity((rootEntity, rootErr) => {
				if (!rootEntity) {
					this.set(`_organizations.${key}`, {
						name: 'error',
						loading: false,
						error: true,
						errorMessage: rootErr
					});
					return;
				}
				rootEntity.organization(async(orgEntity, orgErr) => {
					if (!orgEntity) {
						this.set(`_organizations.${key}`, {
							name: 'error',
							loading: false,
							error: true,
							errorMessage: orgErr
						});
						return;
					}
					this.set(`_organizations.${key}`, {
						name: orgEntity.name(),
						code: orgEntity.code(),
						href: orgEntity.fullyQualifiedOrganizationHomepageUrl(),
						loading: false,
						error: false
					});

					if (orgEntity.alertsUrl() && consortiumEntity.consortiumToken()) {
						this._alertTokensMap[orgEntity.alertsUrl()] = consortiumEntity.consortiumToken();
					}
					const cacheKey = await this._getCacheKey();
					this._trySetItemSessionStorage(cacheKey, Object.assign({}, this._cache, this._organizations));

					orgEntity.onAlertsChange(async(alertsEntity) => {
						if (alertsEntity) {
							const unread = alertsEntity.hasUnread();
							this.set(`_organizations.${key}.unread`, unread);
							const cacheKey = await this._getCacheKey();
							this._trySetItemSessionStorage(cacheKey, Object.assign({}, this._cache, this._organizations));
						}
					});

				});

			});
		});
	}

	_resetMaps() {
		this.set('_organizations', {});
		this.set('_alertTokensMap', {});
	}
	_computeErrors(organizations) {
		return Object.keys(organizations).filter(key => organizations[key].error);
	}
	_computeParsedOrganizations() {
		const currentOrganizations = Object.assign({}, this._cache, this._organizations);
		this.set('_errors', this._computeErrors(currentOrganizations));
		const orgs = Object.keys(currentOrganizations).filter(key => currentOrganizations[key].error !== true).map(function(key) {
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

		if (!this._requestedScrollTimeoutId && Object.keys(currentOrganizations).length > 0) {
			const stillLoading = Object.keys(currentOrganizations).some(key => currentOrganizations[key].loading);
			if (!stillLoading) {
				this.tryRequestScroll();
			}
		}
		return Object.keys(currentOrganizations).length >= this.tabRenderThreshold ? orgs : []; //don't render anything if we don't pass our render threshold
	}
	_successfulTabToolTipText(item) {
		return item.loading ? this.localize('loading') : item.fullName;
	}
	_getTabHref(item) {
		return this._isSelected(item) ? undefined : item.href;
	}
	_getTabAriaLabel(item) {
		return this._checkOrgNotification(item) ? this.localize('newNotifications', 'name', item.fullName) : item.fullName;
	}
	_hasErrors(errors) {
		return errors.length > 0;
	}
	_checkOrgNotification(org) {
		return org.hasNotification && !this._isSelected(org);
	}
	_checkNotifications(orgs) {
		const nowHasNotifications = orgs.value.some((org) => { return this._checkOrgNotification(org); });

		if (this._hasNotifications === nowHasNotifications) {
			return;
		}

		this._hasNotifications = nowHasNotifications;
		this.dispatchEvent(
			new CustomEvent(
				'd2l-organization-consortium-tabs-notification-update',
				{
					detail: {
						hasOrgTabNotifications: nowHasNotifications
					},
					bubbles: true,
					composed: true
				}
			)
		);
	}
}

window.customElements.define(OrganizationConsortiumTabs.is, OrganizationConsortiumTabs);
