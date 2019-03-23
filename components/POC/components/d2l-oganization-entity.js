// Import the LitElement base class and html helper function
import { LitElement } from 'lit-element';
import { entityFactory, decompose } from 'Entity.js';
import { OrganizationEntity } from 'es6/OrganizationEntity.js';

class D2lOrganizationEntity extends LitElement {
	render() {
		return '';
	}

	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true
			},
			token: String,
			_entity: Object
		};

	}
	// Does this run when the element is detacted? Assume that is true.
	disconnectedCallback() {
		super.disconnectedCallback();
		decompose(this._entity);
	}
	update(changedProperties) {
		super.update(changedProperties);
		if (changedProperties.href || changedProperties.token) {
			entityFactory(OrganizationEntity, this.href, this.token, entity => this._entity = entity);
		}
		if (changedProperties.entity) {
			this.dispatchEvent(new CustomEvent('on-change', {
				detail: {
					entity: this._entity
				}
			}));
		}
	}
}
// Register the new element with the browser.
customElements.define('d2l-organization-entity', D2lOrganizationEntity);
