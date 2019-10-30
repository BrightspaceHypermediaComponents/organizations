import { LitElement, css, html } from 'lit-element/lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { OrganizationAvailabilityEntity } from 'siren-sdk/src/organizations/OrganizationAvailabilityEntity.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import '@brightspace-ui/core/components/inputs/input-checkbox';
import { getLocalizeResources } from './localization.js';

class CurrentOrganizationAvailability extends EntityMixinLit(LocalizeMixin(LitElement)) {

	static get properties() {
		return {
			_name: { type: String },
			_canDeleteAvailability: { type: Boolean }
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
			this._canDeleteAvailability = entity.canDeleteAvailability();
		}
	}

	_setName(entity) {
		if (entity) {
			entity.onOrganizationChange(organization => {
				this._name = organization.name()
			});
		}
	}

	render() {
		return html`
			<d2l-input-checkbox checked ?disabled="${!this._canDeleteAvailability}">
				${this.localize('currentOrgUnitItemDescription', { name: this._name })}
			</d2l-input-checkbox>
		`;
	}
};

customElements.define('d2l-current-organization-availability', CurrentOrganizationAvailability);
