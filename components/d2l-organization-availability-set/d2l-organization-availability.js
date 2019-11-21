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
		return getLocalizeResources(langs, import.meta.url);
	}

	constructor() {
		super();
		this._setEntityType(OrganizationAvailabilityEntity);
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAvailabilityChange(entity);
			super._entity = entity;
		}
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
				this._itemDescription = this._generateItemDescription(entity, this._name);
			});
		}
	}

	_generateItemDescription(entity, name) {
		if (entity && name) {
			const type = entity.getCurrentTypeName();

			if (entity.isExplicitAvailability()) {
				return this.localize('explicitItemDescription', { type, name });
			}

			if (entity.isInheritAvailability()) {
				const descendantType = entity.getDescendantTypeName();
				if (descendantType) {
					return this.localize('inheritItemWithDescendantTypeDescription', { type, name, descendantType });
				}
				return this.localize('inheritItemDescription', { type, name });
			}
		}
		return '';
	}

	_delete() {
		this._isDeleting = true;
		super._entity.delete();
	}

	render() {
		return html`
			${this._itemDescription}
			${this._itemDescription && this._canDelete ? html`
				<d2l-button-icon
					?disabled="${this._isDeleting}"
					text="${this.localize('removeAvailabilityFor', { itemDescription: this._itemDescription })}"
					icon="tier1:close-default"
					@click="${this._delete}"></d2l-button-icon>
			` : ''}
		`;
	}

}

customElements.define('d2l-organization-availability', OrganizationAvailability);
