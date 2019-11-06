import '@brightspace-ui/core/components/button/button-icon.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from './localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { OrganizationAvailabilityEntity } from 'siren-sdk/src/organizations/OrganizationAvailabilityEntity.js';

class OrganizationAvailability extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			_canDelete: { type: Boolean },
			_name: { type: String },
			_itemDescription: { type: String },
			_isDeleting: { type: Boolean }
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
		return getLocalizeResources(langs);
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
			this._canDelete = entity.canDelete();
			this._setName(entity);
		}
	}

	_setName(entity) {
		if (entity) {
			entity.onOrganizationChange(organization => {
				this._name = organization.name();
				this._setItemDescription(entity, this._name);
			});
		}
	}

	_setItemDescription(entity, name) {
		let itemDescription = '';
		if (entity && name) {
			const type = entity.getCurrentTypeName();

			if (entity.isExplicitAvailability()) {
				itemDescription = this.localize('explicitItemDescription', { type, name });
			} else if (entity.isInheritAvailability()) {
				const descendentType = entity.getDescendentTypeName();

				if (descendentType) {
					itemDescription = this.localize('inheritItemWithDescendentTypeDescription', { type, name, descendentType });
				} else {
					itemDescription = this.localize('inheritItemDescription', { type, name });
				}
			}
		}
		this._itemDescription = itemDescription;
	}

	async _delete() {
		this._isDeleting = true;
		await super._entity.delete();
		this._isDeleting = false;
	}

	render() {
		return html`
			${this._itemDescription}
			${this._itemDescription && this._canDelete && html`
				<d2l-button-icon
					?disabled="${this._isDeleting}"
					text="${this.localize('removeAvailabilityFor', { itemDescription: this._itemDescription })}"
					icon="tier1:close-default"
					@click="${this._delete.bind(this)}"></d2l-button-icon>
			`}
		`;
	}

}

customElements.define('d2l-organization-availability', OrganizationAvailability);
