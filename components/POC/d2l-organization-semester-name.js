import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-course-image/d2l-course-image.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import { OrganizationEntity } from 'd2l-organization-siren';

/**
 * @customElement
 * @polymer
 */
class D2lOrganizationSemesterName extends mixinBehaviors([ D2L.PolymerBehaviors.Siren.EntityBehavior ], PolymerElement) {
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
			'_handleOrganizationResponse(entity)'
		];
	}

	_handleOrganizationResponse(organization) {
		if (!organization) {
			return;
		}

		this._organization = new OrganizationEntity(organization);
		this._organization.listenSemester((semester) => {
			this._semesterName = semester.tryGetName();
		});
	}
}

window.customElements.define('d2l-organization-semester-name', D2lOrganizationSemesterName);
