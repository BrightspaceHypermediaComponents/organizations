import '../d2l-organization-image/d2l-organization-image.js';
import './d2l-organization-admin-list-pager.js';
import './d2l-organization-admin-list-search-header.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/list/list-item-content.js';
import '@brightspace-ui/core/components/list/list-item.js';
import '@brightspace-ui/core/components/list/list.js';
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
			}
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

				.d2l-organization-admin-list-item-image {
					border-radius: 6px;
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
						organization
					};
					loadedCount++;
					if (loadedCount > totalCount) {
						this.items = items;
					}
				});
			}
		);

		collection.subEntitiesLoaded().then(() => {
			this._items = items;
			this._totalPages = collection.totalPages();
			this._currentPage = collection.currentPage();
			this._collection = collection;
		});
	}

	_handleSearch(searchText) {
		this._collection.search(searchText).then(href => {
			this.href = href;
		});
	}

	_handlePageChanged(page) {
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
		const items = this._items.map(
			item =>
				html`
					<d2l-list-item
						.breakpoints=${[1170, 391, 0, 0]}
						href=${ifDefined(item.usage.editHref())}
					>
						<d2l-organization-image
							class='d2l-organization-admin-list-item-image'
							href=${item.organization.self()}
							slot='illustration'
						></d2l-organization-image>
						<d2l-list-item-content>
							<div>${item.organization.name()}</div>
						</d2l-list-item-content>
					</d2l-list-item>
				`
		);
		console.log(this._totalPages);
		return html`
			<div class='d2l-organization-admin-list-content-container d2l-organization-admin-list-header-container'>
				<div class='d2l-organization-admin-list-content d2l-organization-admin-list-header'>
					<h1 class='d2l-heading-1 d2l-organization-admin-list-title'>
						${this.titleText}
					</h1>
					${ this._collection && this._collection.canCreateOrgUnit() ? html`
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
					<d2l-organization-admin-list-search-header .onSearchTextChanged=${this._handleSearch.bind(this)}>
					</d2l-organization-admin-list-search-header>
					<d2l-list>${items}</d2l-list>
					<d2l-organization-admin-list-pager current-page="${this._currentPage}" total-pages="${this._totalPages}" .onPageChanged="${this._handlePageChanged.bind(this)}">
					</d2l-organization-admin-list-pager>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-organization-admin-list', AdminList);
