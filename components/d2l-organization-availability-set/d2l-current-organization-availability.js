import 'd2l-inputs/d2l-input-checkbox';
import { css, html, LitElement } from 'lit-element/lit-element';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeOrganizationAvailabilitySet } from './localization.js';
import { OrganizationAvailabilityEntity } from 'siren-sdk/src/organizations/OrganizationAvailabilityEntity.js';

class CurrentOrganizationAvailability extends EntityMixinLit(LocalizeOrganizationAvailabilitySet(LitElement)) {

	static get properties() {
		return {
			_name: { type: String },
			_canDelete: { type: Boolean }
		};
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

	constructor() {
		super();
		this._setEntityType(OrganizationAvailabilityEntity);
	}

	render() {
		return html`
			<d2l-input-checkbox checked ?disabled="${!this._canDelete}" @change="${this._onCheckboxChange}">
				${this._itemDescription}
			</d2l-input-checkbox>
		`;
	}
	get _itemDescription() {
		return this.localize('currentOrgUnitItemDescription', { name: this._name });
	}
	set _entity(entity) {
		this._onAvailabilityChange(entity);
		super._entity = entity;
	}

	_delete(e) {
		const checkboxElem = e.target;
		const promise = () => {
			return super._entity.delete().then(() => {
				announce(this.localize('notAvailableToCurrentOrgUnit', { name: this._name }));
			}).catch((error) => {
				checkboxElem.checked = true;
				return Promise.reject(error);
			});
		};

		this.dispatchEvent(
			new CustomEvent('delete-organization-availability', {
				bubbles: true,
				composed: true,
				detail: { promise }
			})
		);
	}
	_onAvailabilityChange(entity) {
		if (entity) {
			this._setName(entity);
			this._canDelete = entity.canDelete();
		}
	}

	_onCheckboxChange(e) {
		if (!e.target.checked) {
			this._delete(e);
		}
	}
	_setName(entity) {
		if (entity) {
			entity.onOrganizationChange(organization => {
				this._name = organization.name();
			});
		}
	}

}

customElements.define('d2l-current-organization-availability', CurrentOrganizationAvailability);
