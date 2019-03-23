import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from './entity-store/entity-mixin.js';
import { OrganizationEntity } from './es6/OrganizationEntity.js';

/**
 * @customElement
 * @polymer
 */
class D2lOrganizationSemesterName extends EntityMixin(PolymerElement) {
	constructor() {
		super();
		// Using entity mixin we have to set the type of the entity we are going to get.
		this._setEntityType(OrganizationEntity);
	}

	static get template() {
		return html`
			[[_semesterName]]
		`;
	}

	static get properties() {
		return {
			_semesterName: String
		};
	}
	static get observers() {
		return [
			'_onOrganizationChange(_entity)'
		];
	}

	_onOrganizationChange(organization) {
		if (!organization) {
			return;
		}

		// entity object will keep track of semester object and blow it up when it blows up.
		// organization is a reference to this._entity defined in EntityMixin.
		organization.onSemesterChange((semester) => {
			this._semesterName = semester.name();
		});
	}
}

window.customElements.define('d2l-organization-semester-name', D2lOrganizationSemesterName);
