import { css, html, LitElement } from 'lit-element/lit-element.js';
import { heading1Styles, bodyStandardStyles } from '@brightspace-ui/core/components/typography/styles.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { OrganizationCollectionEntity } from "siren-sdk/src/organizations/OrganizationCollectionEntity.js";
import {ifDefined} from 'lit-html/directives/if-defined';
import '@brightspace-ui/core/components/colors/colors.js';
import '@brightspace-ui/core/components/button/button.js';
import '@brightspace-ui/core/components/list/list.js';
import '@brightspace-ui/core/components/list/list-item.js';
import 'd2l-organizations/components/d2l-organization-image/d2l-organization-image.js';

class AdminList extends EntityMixinLit(LitElement) {
	static get properties() {
		return {
			"title-text": {
				type: String
			},
			_items: {
				type: Array
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
					padding: 0 2.439%;
					max-width: 1230px;
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
					height: 200px;
					background-image: linear-gradient(
						to top,
						white 50%,
						var(--d2l-color-regolith)
					);
					width: 100%;
					position: absolute;
					left: 0;
					top: 0;
				}
				.d2l-organization-admin-list-body {
					padding-top: 72px;
					padding-bottom: 72px;
				}

				.d2l-organization-admin-list-item-image {
					border-radius: 6px;
				}

				.d2l-organization-admin-list-search-results-page-number-container {
					margin: 15px;
					display: flex;
					align-items: center;
					justify-content: center;
				}
				.d2l-organization-admin-list-search-results-page-count {
					width: auto;
					max-width: 4rem;
				}

				@media (max-width: 420px) {
					.d2l-organization-admin-list-header {
						flex-direction: column;
						justify-content: flex-start;
						align-items: flex-start;
					}
					.d2l-organization-admin-list-create-button {
						width: 100%;
						margin-bottom: 24px;
					}
				}

				@media (max-width: 615px) {
					.d2l-organization-admin-list-content {
						padding: 0 15px;
					}
				}

				@media (min-width: 1230px) {
					.d2l-organization-admin-list-content {
						padding: 0 30px;
					}
				}
			`
		];
	}

	constructor() {
		super();
		this._items = [];
		this._setEntityType(OrganizationCollectionEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			console.log(entity);
			this._onOrganizationCollectionChanged(entity);
			super._entity = entity;
		}
	}

	_onOrganizationCollectionChanged(collection) {
		this._items = [];
		this._pageTotal = collection.totalPages();
		this._pageCurrent = collection.currentPage();
		this._hasNextPage = collection.hasNextPage();
		this._hasPrevPage = collection.hasPrevPage();
		this._nextPageHref = collection.getNextPageHref();
		this._prevPageHref = collection.getPrevPageHref();
		collection.onOrganizationsChange((organization, index) => {
			this._items[index] = { usage: { editHref: () => 'Wow'}, organization };
			this.requestUpdate();
		});
	}

	_toPreviousPage() {
		console.log('to prev page');
		this.href = this._prevPageHref;
	}

	_toNextPage() {
		console.log('to next page');
		this.href = this._nextPageHref;
	}

	render() {
		const items = this._items.map(
			item =>
				html`
					<d2l-list-item
						href=${ifDefined(item.usage.editHref())}
					>
						<d2l-organization-image
							class="d2l-organization-admin-list-item-image"
							href=${item.organization.self()}
							slot="illustration"
						></d2l-organization-image>
						<d2l-list-item-content>
							<div>${item.organization.name()}</div>
						</d2l-list-item-content>
					</d2l-list-item>
				`
		);
		return html`
			<div class="d2l-organization-admin-list-content-container d2l-organization-admin-list-header-container">
				<div class="d2l-organization-admin-list-content d2l-organization-admin-list-header">
					<h1 class="d2l-heading-1 d2l-organization-admin-list-title">${this["title-text"]}</h1>
					<d2l-button class="d2l-organization-admin-list-create-button" primary>Create Learning Path</d2l-button>
				</div>
			</div>

			<div class="d2l-organization-admin-list-content-container d2l-organization-admin-list-body-container">
				<div class="d2l-organization-admin-list-background-gradient"></div>
				<div class="d2l-organization-admin-list-content d2l-organization-admin-list-body">
					<d2l-list>${items}</d2l-list>
					<div class="d2l-organization-admin-list-search-results-page-number-container">
						<d2l-button-icon
							icon="d2l-tier1:chevron-left"
							aria-label$="[[localize('pagePrevious')]]"
							.disabled=${!this._hasPrevPage}
							@click=${this._toPreviousPage}
							on-keydown=${this._toPreviousPage}
						>
						</d2l-button-icon>
						<d2l-input-text
							class="d2l-organization-admin-list-search-results-page-count"
							type="number"
							aria-label$="[[localize('pageSelection', 'pageCurrent', _pageCurrent, 'pageTotal', _pageTotal)]]"
							name="myInput"
							value=${this._pageCurrent}
							min="1"
							max=${this._pageTotal}
							size="[[_countDigits(_pageTotal)]]"
							on-keydown="_toPage"
							on-blur="_inputPageCounterOnBlur"
						>
						</d2l-input-text>
						<div>&nbsp/&nbsp${this._pageTotal}</div>
						<d2l-button-icon
							icon="d2l-tier1:chevron-right"
							aria-label$="[[localize('pageNext')]]"
							.disabled=${!this._hasNextPage}
							@click=${this._toNextPage}
							on-keydown=${this._toNextPage}
						>
						</d2l-button-icon>
					</div>
				</div>
			</div>
		`;
	}
}
customElements.define('d2l-organization-admin-list', AdminList);
