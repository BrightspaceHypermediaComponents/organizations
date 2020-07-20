import '@brightspace-ui/core/components/button/button-icon.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { announce } from '@brightspace-ui/core/helpers/announce.js';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { LocalizeOrganizationAvailabilitySet } from './localization.js';
import { OrganizationAvailabilityEntity } from 'siren-sdk/src/organizations/OrganizationAvailabilityEntity.js';

class OrganizationAvailability extends EntityMixinLit(LocalizeOrganizationAvailabilitySet(LitElement)) {

	static get properties() {
		return {
			_canDelete: { type: Boolean },
			_name: { type: String },
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

	constructor() {
		super();
		this._setEntityType(OrganizationAvailabilityEntity);
	}

	get _entity() {
		return super._entity;
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
			});
		}
	}

	_delete() {
		this._isDeleting = true;

		const promise = () => {
			return super._entity.delete().then(() => {
				announce(this.localize('availabilityRemoved', { itemDescription: this._itemDescription }));
			}).catch((error) => {
				this._isDeleting = false;
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

	get _itemDescription() {
		const entity = this._entity;
		const name = this._name;
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

	render() {
		const itemDescription = this._itemDescription;
		return html`
			${itemDescription}
			${itemDescription && this._canDelete ? html`
				<d2l-button-icon
					?disabled="${this._isDeleting}"
					text="${this.localize('removeAvailabilityFor', { itemDescription })}"
					icon="tier1:close-default"
					@click="${this._delete}"></d2l-button-icon>
			` : ''}
		`;
	}

}

customElements.define('d2l-organization-availability', OrganizationAvailability);
