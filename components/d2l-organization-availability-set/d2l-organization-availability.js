import { LitElement, css, html } from 'lit-element/lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { OrganizationAvailabilityEntity } from 'siren-sdk/src/organizations/OrganizationAvailabilityEntity.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';

import { getLocalizeResources } from './localization.js';
import '../d2l-organization-name/d2l-organization-name.js';



class OrganizationAvailability extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			isCurrentOrgUnit: { type: Boolean },
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
				this._name = organization.name()
			});
		}
	}

	_renderItemDescription(entity, name) {
		if (entity) {
			const canDeleteAvailability = entity.canDeleteAvailability();
			if (this.isCurrentOrgUnit) {
				return html`
					<d2l-input-checkbox checked ?disabled="${!canDeleteAvailability}">
						${this.localize('currentOrgUnitItemDescription', { name })}
					</d2l-input-checkbox>
				`;
			}

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


};

customElements.define('d2l-organization-availability', OrganizationAvailability);
