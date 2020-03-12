import '../d2l-organization-image/d2l-organization-image.js';
import './d2l-organization-admin-list-pager.js';
import './d2l-organization-admin-list-search-header.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/loading-spinner/loading-spinner.js';
import '@brightspace-ui/core/components/dialog/dialog-confirm.js';
import 'd2l-alert/d2l-alert-toast.js';
import {
	heading1Styles,
	bodyStandardStyles
} from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from './localization.js';
import { ifDefined } from 'lit-html/directives/if-defined';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { OrganizationCollectionEntity } from 'siren-sdk/src/organizations/OrganizationCollectionEntity.js';
import { dispose } from 'siren-sdk/src/es6/EntityFactory';

class AdminList extends EntityMixinLit(LocalizeMixin(LitElement)) {
	static get properties() {
		return {
			titleText: {
				type: String
			},
			createActionTitleTerm: {
				type: String
			},
			createActionDefaultNameTerm: {
				type: String
			},
			createActionType: {
				type: String
			},
			_showImages: { type: Boolean },
			_loaded: { type: Boolean },
			_items: {
				type: Array
			},
			_totalPages: {
				type: Number
			},
			_currentPage: {
				type: Number
			},
			_collection: {
				type: Object
			},
			_deletedName: { type: String }
		};
	}

	static get styles() {
		return [
			heading1Styles,
			bodyStandardStyles,
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}
				.d2l-organization-admin-list-content-container {
					display: flex;
					justify-content: center;
					position: relative;
				}
				.d2l-organization-admin-list-content {
					box-sizing: border-box;
					max-width: 1230px;
					padding-left: 2.439%;
					padding-right: 2.439%;
					width: 100%;
				}

				.d2l-organization-admin-list-header-container {
					border-bottom: solid 1px var(--d2l-color-gypsum);
					box-sizing: border-box;
					width: 100%;
				}
				.d2l-organization-admin-list-header {
					align-items: center;
					display: flex;
					justify-content: space-between;
				}
				.d2l-organization-admin-list-title {
					margin: 24px 0;
				}

				.d2l-organization-admin-list-background-gradient {
					background-image: linear-gradient(
						to top,
						white 50%,
						var(--d2l-color-regolith)
					);
					height: 200px;
					left: 0;
					position: absolute;
					top: 0;
					width: 100%;
					z-index: -1;
				}
				.d2l-organization-admin-list-body {
					padding-bottom: 72px;
					padding-top: 6px;
				}

				.d2l-organization-admin-list-disabled {
					filter: grayscale(100%);
					opacity: 0.6;
				}

				.d2l-organization-admin-list-list,
				.d2l-organization-admin-list-item-illustration {
					display: grid;
					grid-template-columns: 100%;
					grid-template-rows: 100%;
					grid-template-areas: only-one;
					position: relative;
				}

				.d2l-organization-admin-list-list *,
				.d2l-organization-admin-image-skeleton,
				.d2l-organization-admin-list-item-image {
					grid-column: 1;
					grid-row: 1;
				}

				.d2l-organization-admin-list-body-compact-skeleton {
					height: 3.6rem;
					display: flex;
					align-items: center;
					min-width: 25rem;
				}

				.d2l-organization-admin-list-body-compact-skeleton-svg {
					height: 0.55rem;
				}

				.d2l-organization-admin-list-body-small-skeleton-svg {
					height: 0.5rem;
				}

				@keyframes loadingPulse {
					0% { fill: var(--d2l-color-sylvite); }
					50% { fill: var(--d2l-color-regolith); }
					75% { fill: var(--d2l-color-sylvite); }
					100% { fill: var(--d2l-color-sylvite); }
				}

				.d2l-organization-admin-skeleton-rect {
					animation: loadingPulse 1.8s linear infinite;
					fill: var(--d2l-color-sylvite);
				}

				.d2l-organization-admin-list-no-activity {
					background-color: var(--d2l-color-regolith);
					border: solid 1px var(--d2l-color-gypsum);
					border-radius: 8px;
					padding: 2.1rem 2rem;
				}

				.d2l-organization-admin-list-search-skeleton {
					align-items: center;
					display: flex;
					height: 42px;
					margin: 0.6rem 0;
					width: 270px;
				}
				.d2l-organization-admin-list-search-skeleton-svg {
					max-height: 100%;
				}

				.d2l-organization-admin-list-search {
					min-height: 2.1rem;
				}

				.confirm-delete{
					margin-bottom: 18px;
				}

				@media (max-width: 420px) {
					.d2l-organization-admin-list-header {
						align-items: flex-start;
						flex-direction: column;
						justify-content: flex-start;
					}
					.d2l-organization-admin-list-create-button {
						margin-bottom: 24px;
						width: 100%;
					}
				}

				@media (max-width: 615px) {
					.d2l-organization-admin-list-content {
						padding-left: 15px;
						padding-right: 15px;
					}
				}

				@media (min-width: 1230px) {
					.d2l-organization-admin-list-content {
						padding-left: 30px;
						padding-right: 30px;
					}
				}
			`
		];
	}

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._items = [];
		this._showImages = false;
		this._loadedImages = 0;
		this._loaded = false;
		this._firstLoad = true;
		this._setEntityType(OrganizationCollectionEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onOrganizationCollectionChanged(entity);
			super._entity = entity;
		}
	}

	_onOrganizationCollectionChanged(collection) {
		const items = [];

		let loadedCount = 0;
		const totalCount = collection.onOrganizationsChange(
			(organization, index) => {
				organization.onActivityUsageChange(activityUsage => {
					items[index] = {
						usage: { editHref: () => activityUsage.editHref() },
						organization,
						remove: organization.canDelete() ? () => this._deleteItem(organization) : null
					};
					loadedCount++;
					if (loadedCount > totalCount) {
						this._items = items;
					}
				});
			}
		);
		collection.subEntitiesLoaded().then(() => {
			this._disposeOldEntities();
			this._items = items;
			this._totalPages = collection.totalPages();
			this._currentPage = collection.currentPage();
			this._collection = collection;
			this._loaded = true;
			if (!this._firstLoad) {
				this.updateComplete.then(() => {
					this.shadowRoot.querySelector('.d2l-organization-admin-list-list d2l-list d2l-list-item').focus();
				});
			}
			this._firstLoad = false;
		});
	}

	_disposeOldEntities() {
		this._items && this._items.forEach(item => {
			item && dispose(item);
		});
		this._collection && dispose(this._collection);
	}

	async _deleteItem(organization) {
		const dialog = this.shadowRoot.querySelector('#confirm-delete-dialog');
		const result = await dialog.open();
		if (!result) {
			return;
		}
		dispose(organization);
		await organization.delete();

		this._items = this._items.filter(cur => cur.organization !== organization);
		this._deletedName = organization.name();

		this.shadowRoot.querySelector('#delete-succeeded-toast').open = true;
	}

	_resetLoad() {
		this._showImages = false;
		this._loadedImages = 0;
		this._loaded = false;
		window.scrollTo(0, 0);
	}

	_handleSearch(searchText) {
		this._resetLoad();
		this._searchText = searchText;
		this._collection.search(searchText).then(href => {
			this.href = href;
		});
	}

	_handlePageChanged(page) {
		this._resetLoad();
		if (page === this._currentPage + 1) {
			this.href = this._collection.nextPageHref();
		} else if (page === this._currentPage - 1) {
			this.href = this._collection.prevPageHref();
		} else {
			this._collection.jumpToPage(page).then(href => {
				this.href = href;
			});
		}
	}

	_createOrgUnit() {
		const name = this.localize(this.createActionDefaultNameTerm);
		this._collection
			.createOrgUnit(name, 'LP', this.createActionType)
			.then(organization => {
				organization.onActivityUsageChange(activityUsage => {
					window.location.href = activityUsage.editHref();
				});
			});
	}

	render() {
		const items = this._handleLoading(this._renderItemList.bind(this), () => this._renderItemListSkeleton(3), () => {
			return html`
				<div class="d2l-organization-admin-list-disabled">
					${this._currentListElements}
				</div>
				<d2l-loading-spinner size="100"></d2l-loading-spinner>
			`;
		});

		const search = this._handleLoading(() => {
			return html`<d2l-organization-admin-list-search-header class="d2l-organization-admin-list-search" .onSearchTextChanged=${this._handleSearch.bind(this)}></d2l-organization-admin-list-search-header>`;
		}, () => {
			return html`
				<div class="d2l-organization-admin-list-search-skeleton">
						<svg width="100%" class="d2l-organization-admin-list-search-skeleton-svg">
							<rect x="0" width="100%" y="0" height="100%" stroke="none" rx="4" class="d2l-organization-admin-skeleton-rect"></rect>
						</svg>
					</div>
				</div>
			`;
		});

		return html`
			<div class='d2l-organization-admin-list-content-container d2l-organization-admin-list-header-container'>
				<div class='d2l-organization-admin-list-content d2l-organization-admin-list-header'>
					<h1 class='d2l-heading-1 d2l-organization-admin-list-title'>
						${this.titleText}
					</h1>
					${this._collection && this._collection.canCreateOrgUnit() ? html`
						<d2l-button
							class='d2l-organization-admin-list-create-button'
							primary
							@click='${this._createOrgUnit}'
						>
							${this.localize(this.createActionTitleTerm)}
						</d2l-button>
					` : null }
				</div>
			</div>
			<div class='d2l-organization-admin-list-content-container d2l-organization-admin-list-body-container'>
				<div class='d2l-organization-admin-list-background-gradient'></div>
				<div class='d2l-organization-admin-list-content d2l-organization-admin-list-body'>
					${search}
					<div class="d2l-organization-admin-list-list" aria-live="polite" aria-busy="${!this._loaded ? html`true` : html`false`}">${items}</div>
					${this._handleLoading(() => this._items.length <= 0 ? null : html`
						<d2l-organization-admin-list-pager
							current-page="${this._currentPage}"
							total-pages="${this._totalPages}"
							.onPageChanged="${this._handlePageChanged.bind(this)}">
						</d2l-organization-admin-list-pager>
					`)}
				</div>
			</div>
			<d2l-dialog-confirm title-text=${this.localize('confirmDeleteTitle')} text=${this.localize('confirmDeleteMessage')} id="confirm-delete-dialog">
				<d2l-button slot="footer" class="confirm-delete" primary dialog-action="yes">${this.localize('yesAction')}</d2l-button>
				<d2l-button slot="footer" dialog-action>${this.localize('noAction')}</d2l-button>
			</d2l-dialog-confirm>
			<d2l-alert-toast id="delete-succeeded-toast" type="default" announce-text=${this.localize('deleteSucceeded', 'name', this._deletedName)}>
				${this.localize('deleteSucceeded', 'name', this._deletedName)}
			</d2l-alert-toast>
		`;
	}

	updated() {
		super.updated();
		this._currentListElements = this.shadowRoot.querySelector('.d2l-organization-admin-list-list d2l-list');
	}

	_renderItemList() {
		if (this._items.length <= 0) {
			return html`
				<div class="d2l-organization-admin-list-no-activity d2l-body-standard">
					${this._searchText ? this.localize('noLearningPathWithSearchTerm', 'searchTerm', this._searchText) : this.localize('noLearningPath')}
				</div>
			`;
		}

		const items = this._items.map(
			item =>
				html`
					<d2l-list-item
						.breakpoints=${[1170, 391, 0, 0]}
						href=${ifDefined(this._loaded ? item.usage.editHref() : undefined)}
					>
						<div slot="illustration" class="d2l-organization-admin-list-item-illustration">
							${this._renderCourseImageSkeleton()}
							<d2l-organization-image
								class="d2l-organization-admin-list-item-image"
								href=${item.organization.self()}
								.token=${this.token}
								@d2l-organization-image-loaded="${this._onListImageLoaded}"
								?hidden="${!this._showImages}">
							</d2l-organization-image>
						</div>
						<d2l-list-item-content>
							<div>${item.organization.name()}</div>
							<div slot="secondary">
								<d2l-icon icon="tier1:visibility-${item.organization.isActive() ? 'show' : 'hide'}"></d2l-icon>
								${item.organization.isActive() ? this.localize('visibleToUsers') : this.localize('hiddenFromUsers')}
							</div>
						</d2l-list-item-content>
						<div slot="actions">
							${ item.remove ? html`
							<d2l-button-icon
								text="${this.localize('removeLearningPath', 'name', item.organization.name())}"
								icon="tier1:delete"
								@click="${item.remove}">
							</d2l-button-icon>` : null }
						</div>
					</d2l-list-item>
				`
		);

		return html`<d2l-list>${items}</d2l-list>`;
	}

	_renderCourseImageSkeleton() {
		return html`
			<svg viewBox="0 0 216 120" width="100%" slot="illustration">
				<rect x="0" width="100%" y="0" height="100%" stroke="none" class="d2l-organization-admin-skeleton-rect"></rect>
			</svg>
		`;
	}

	_renderItemListSkeleton(numberOfItems) {
		const itemsSkeleton = html`
			<d2l-list-item>
				${this._renderCourseImageSkeleton()}
				<d2l-list-item-content>
					<svg width="100%" class="d2l-organization-admin-list-body-compact-skeleton-svg">
						<rect x="0" width="40%" y="0" height="100%" stroke="none" rx="4" class="d2l-organization-admin-skeleton-rect"></rect>
					</svg>
					<div slot="secondary">
						<svg width="100%" class="d2l-organization-admin-list-body-small-skeleton-svg">
							<rect x="0" width="30%" y="0" height="100%" stroke="none" rx="4" class="d2l-organization-admin-skeleton-rect"></rect>
						</svg>
					</div>
				</d2l-list-item-content>
			</d2l-list-item>
		`;
		return html`<d2l-list>${(new Array(numberOfItems)).fill(itemsSkeleton)}</d2l-list>`;
	}

	_onListImageLoaded() {
		this._loadedImages++;
		if (this._loadedImages >= this._items.length) {
			this._showImages = true;
		}
	}

	_handleLoading(whenLoaded, firstLoad = () => null, nextLoad =  null) {
		nextLoad = nextLoad === null ? whenLoaded : nextLoad;
		return this._firstLoad ? (this._loaded ? whenLoaded() : firstLoad()) : (this._loaded ? whenLoaded() : nextLoad());
	}
}
customElements.define('d2l-organization-admin-list', AdminList);
