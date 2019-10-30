import { css, html, LitElement } from 'lit-element/lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from './localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { OrganizationAvailabilityEntity } from 'siren-sdk/src/organizations/OrganizationAvailabilityEntity.js';

class OrganizationAvailability extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			_name: { type: String }
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

	_renderItemDescription(entity, name) {
		if (entity) {
			const type = entity.getCurrentTypeName();

			if (entity.isExplicitAvailability()) {
				return this.localize('explicitItemDescription', { type, name });
			}

			if (entity.isInheritAvailability()) {
				const descendentType = entity.getDescendentTypeName();

				if (descendentType) {
					return this.localize('inheritItemWithDescendentTypeDescription', { type, name, descendentType });
				}
				return this.localize('inheritItemDescription', { type, name });
			}
		}
	}

	render() {
		return html`
			${this._renderItemDescription(super._entity, this._name)}
		`;
	}

}

customElements.define('d2l-organization-availability', OrganizationAvailability);
