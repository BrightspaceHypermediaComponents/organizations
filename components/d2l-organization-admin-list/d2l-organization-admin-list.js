import { css, html, LitElement } from 'lit-element/lit-element.js';

class AdminList extends LitElement {
	static get properties() {
		return {};
	}

	static get styles() {
		return css`
			:host {
				display: block;
			}
			:host([hidden]) {
				display: none;
			}
		`;
	}

	render() {
		return html`
			<div></div>
		`;
	}
}
customElements.define('d2l-organization-admin-list', AdminList);
