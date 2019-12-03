import 'd2l-inputs/d2l-input-checkbox';
import { css, html, LitElement } from 'lit-element/lit-element';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from './localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { OrganizationAvailabilityEntity } from 'siren-sdk/src/organizations/OrganizationAvailabilityEntity.js';

class CurrentOrganizationAvailability extends EntityMixinLit(LocalizeMixin(LitElement)) {

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

	static async getLocalizeResources(langs) {
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(OrganizationAvailabilityEntity);
	}

	set _entity(entity) {
		this._onAvailabilityChange(entity);
		super._entity = entity;
	}

	_onAvailabilityChange(entity) {
		if (entity) {
			this._setName(entity);
			this._canDelete = entity.canDelete();
		}
	}

	_setName(entity) {
		if (entity) {
			entity.onOrganizationChange(organization => {
				this._name = organization.name();
			});
		}
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

	_onCheckboxChange(e) {
		if (!e.target.checked) {
			this._delete(e);
		}
	}

	get _itemDescription() {
		return this.localize('currentOrgUnitItemDescription', { name: this._name });
	}

	render() {
		return html`
			<d2l-input-checkbox checked ?disabled="${!this._canDelete}" @change="${this._onCheckboxChange}">
				${this._itemDescription}
			</d2l-input-checkbox>
		`;
	}
}

customElements.define('d2l-current-organization-availability', CurrentOrganizationAvailability);
