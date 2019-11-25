import '@brightspace-ui/core/components/button/button';
import 'd2l-inputs/d2l-input-checkbox';
import './d2l-current-organization-availability.js';
import './d2l-organization-availability.js';
import { css, html, LitElement } from 'lit-element/lit-element';
import { EntityMixinLit } from 'siren-sdk/src/mixin/entity-mixin-lit.js';
import { getLocalizeResources } from './localization.js';
import { LocalizeMixin } from '@brightspace-ui/core/mixins/localize-mixin.js';
import { OrganizationAvailabilitySetEntity } from 'siren-sdk/src/organizations/OrganizationAvailabilitySetEntity.js';
import { repeat } from 'lit-html/directives/repeat';
import { SaveStatusMixin } from 'siren-sdk/src/mixin/save-status-mixin.js';

class OrganizationAvailabilitySet extends SaveStatusMixin(EntityMixinLit(LocalizeMixin(LitElement))) {

	static get properties() {
		return {
			_availabilityHrefs: { type: Array },
			_currentOrgUnitEntity: { type: Object },
			_canAddAvailability: { type: Boolean },
			_currentOrgUnitName: { type: String }
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
		this._availabilityHrefs = [];
		this._setEntityType(OrganizationAvailabilitySetEntity);
		if (D2L.Dialog && D2L.Dialog.OrgUnitSelector) {
			this._dialog = new D2L.Dialog.OrgUnitSelector(this.handleOrgUnitSelect.bind(this));
		}
	}

	set _entity(entity) {
		if (this._entityHasChanged(entity)) {
			this._onAvailabilitySetChange(entity);
			super._entity = entity;
		}
	}

	_onAvailabilitySetChange(entity) {
		if (entity) {
			this._availabilityHrefs = entity.getAvailabilityHrefs();
			this._canAddAvailability = entity.canAddAvailability();
			this._currentOrgUnitEntity = entity.getCurrentOrgUnitEntity();
			entity.onOrganizationChange(organization => {
				this._currentOrgUnitName = organization.name();
			});
		}
	}

	render() {
		return html`
			${this._currentOrgUnitEntity ? html`
				<d2l-current-organization-availability
					.href="${this._currentOrgUnitEntity.href}"
					.token="${this.token}">
				</d2l-current-organization-availability>
			` : html`
				${this._currentOrgUnitName && html`
					<d2l-input-checkbox ?disabled="${!this._canAddAvailability}">
						${this.localize('currentOrgUnitItemDescription', { name: this._currentOrgUnitName })}
					</d2l-input-checkbox>
				`}
			`}
			${this._canAddAvailability && html`
				<d2l-button @click=${this.handleAddOrgUnits}>
					${this.localize('addOrgUnits')}
				</d2l-button>
			`}
			${repeat(this._availabilityHrefs, href => href, href => html`
				<d2l-organization-availability
					.href="${href}"
					.token="${this.token}">
				</d2l-organization-availability>
			`)}
		`;
	}

	handleOrgUnitSelect(response) {
		const promises = [];
		if (response.GetType() === D2L.Dialog.ResponseType.Positive) {
			const orgUnits = response.GetData('OrgUnits');
			if (orgUnits) {
				orgUnits.forEach(orgUnit => {
					const addExplicit = orgUnit.OrgUnitId && orgUnit.OrgUnitId !== '0';
					if (addExplicit) {
						promises.push(super._entity.addExplicit(orgUnit.OrgUnitId));
					} else {
						const descendantOrgUnitTypeId = orgUnit.DescendantOrgUnitTypeId === '0' ? null : orgUnit.DescendantOrgUnitTypeId;
						promises.push(super._entity.addInherit(orgUnit.AncestorOrgUnitId, descendantOrgUnitTypeId));
					}
				});
			}
		}
		this.wrapSaveAction(Promise.all(promises)).finally(() => {
			response.GetDialog().Close();
		});
	}

	handleAddOrgUnits(e) {
		if (this._dialog.Open) {
			this._dialog.SetOpener(e.target);
			this._dialog.Open();
		}
	}
}

customElements.define('d2l-organization-availability-set', OrganizationAvailabilitySet);
