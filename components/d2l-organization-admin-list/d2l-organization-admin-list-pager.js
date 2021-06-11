import '@brightspace-ui/core/components/button/button-icon.js';
import '@brightspace-ui/core/components/inputs/input-text.js';
import { css, html, LitElement } from 'lit-element/lit-element.js';
import { LocalizeOrganizationAdminList } from './localization.js';

class AdminListPager extends LocalizeOrganizationAdminList(LitElement) {
	static get properties() {
		return {
			totalPages: {
				type: Number,
				attribute: 'total-pages'
			},
			currentPage: {
				type: Number,
				attribute: 'current-page'
			},
			onPageChanged: {
				type: Function
			}
		};
	}

	static get styles() {
		return [
			css`
				:host {
					display: block;
				}
				:host([hidden]) {
					display: none;
				}

				.d2l-organization-admin-list-pager {
					align-items: center;
					display: flex;
					justify-content: center;
					margin: 15px;
				}
				.d2l-organization-admin-list-pager-count {
					max-width: 4rem;
					width: auto;
				}
				.d2l-organization-admin-list-pager d2l-button-icon {
					margin: 0 0.5rem;
				}
			`
		];
	}

	constructor() {
		super();
		this.currentPage = 1;
		this.totalPages = 1;
	}

	render() {
		return html`
			<div class='d2l-organization-admin-list-pager'>
				<d2l-button-icon
					icon='d2l-tier1:chevron-left'
					aria-label=${this.localize('pagePrevious')}
					?disabled=${!this._hasPreviousPage()}
					@click=${this._toPreviousPage}
				>
				</d2l-button-icon>
				<d2l-input-text
					class='d2l-organization-admin-list-pager-count'
					type='number'
					aria-label=${this.localize('pageSelection', { pageCurrent: this.currentPage, pageTotal: this.totalPages })}
					name='pageInput'
					value=${this.currentPage}
					min='1'
					max=${this.totalPages}
					size=${this._countDigits(this.totalPages)}
					@change=${this._toPage}
					novalidate
				>
				</d2l-input-text>
				<div>&nbsp/&nbsp${this.totalPages}</div>
				<d2l-button-icon
					icon='d2l-tier1:chevron-right'
					aria-label=${this.localize('pageNext')}
					?disabled=${!this._hasNextPage()}
					@click=${this._toNextPage}
				>
				</d2l-button-icon>
			</div>
		`;
	}
	_countDigits(number) {
		return number.toString().length;
	}
	_hasNextPage() {
		return this.currentPage < this.totalPages;
	}
	_hasPreviousPage() {
		return this.currentPage > 1;
	}

	_toNextPage() {
		this.onPageChanged(this.currentPage + 1);
	}
	_toPage(e) {
		// handle invalid input
		const value = Number(e.target.value);
		if (!Number.isInteger(value) || value < 1 || value > this.totalPages) {
			// reset to original
			e.target.value = this.currentPage;
			return;
		}
		this.onPageChanged(value);
	}
	_toPreviousPage() {
		this.onPageChanged(this.currentPage - 1);
	}

}
customElements.define(
	'd2l-organization-admin-list-pager',
	AdminListPager
);
