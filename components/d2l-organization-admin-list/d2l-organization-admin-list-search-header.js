import { css, html, LitElement } from "lit-element/lit-element.js";
import { LocalizeMixin } from "@brightspace-ui/core/mixins/localize-mixin.js";

class AdminListSearchHeader extends LocalizeMixin(LitElement) {
	static get properties() {
		return {
			onSearchTextChanged: {
				type: Function
			},
			_searchText: {
				type: String
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

				.d2l-organization-admin-list-search-header-container {
					display: flex;
					justify-content: space-between;
					margin: 12px 0;
				}

				.d2l-organization-admin-list-search-header-input {
					width: 270px;
				}
			`
		];
	}

	constructor() {
		super();
		this._searchText = "";
    }
    
    _handleSearch(e) {
        if (e && e.detail) {
            const searchText = e.detail.value;
            if (searchText !== this._searchText) {
				this.onSearchTextChanged && this.onSearchTextChanged(searchText);
                this._searchText = searchText;
            }
        }
    }

	render() {
		return html`
			<div class="d2l-organization-admin-list-search-header-container">
				<d2l-input-search
					class="d2l-organization-admin-list-search-header-input"
					label=${this.localize("search")}
					value=${this._searchText}
					placeholder=${this.localize("searchPlaceholder")}
					@d2l-input-search-searched=${this._handleSearch}
				>
				</d2l-input-search>
			</div>
		`;
	}
}
customElements.define(
	"d2l-organization-admin-list-search-header",
	AdminListSearchHeader
);
