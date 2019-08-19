import { LitElement, css, html } from 'lit-element/lit-element';
import '@brightspace-ui/core/components/button/button';

const wc = class extends LitElement {
	static get properties() {
		return {
		};
	}

	static get styles() {
		return [css`
			:host {
				display: block;
			}
		`];
	}

	constructor() {
		super();
		this._dialog = new D2L.Dialog.OrgUnitSelector(this.handleOrgUnitSelect);
	}

	render() {
		return html`<d2l-button @click=${this.handleAddOrgUnits}>Add Org Units</d2l-button>
		`;
	}

	handleOrgUnitSelect() {
	}

	handleAddOrgUnits() {
		this._dialog.Open();
	}
};

customElements.define('d2l-organization-availability-set', wc);
