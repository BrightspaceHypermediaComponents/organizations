import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import 'd2l-course-image/d2l-course-image.js';
import { entityFactory, decompose } from 'entity-store/Entity.js';
import { OrganizationEntity } from 'es6/OrganizationEntity.js';

/**
 * @customElement
 * @polymer
 */
class D2lOrganizationSemesterName extends PolymerElement {
	static get template() {
		return html`
			[[_semesterName]]
		`;
	}

	static get properties() {
		return {
			href: String,
			token: Object,
			_organization: Object,
			_semesterName: String
		};
	}
	static get observers() {
		return [
			'_onHrefChange(href, token)'
		];
	}

	detached() {
		decompose(this._organization);
	}

	_onHrefChange(href, token) {
		entityFactory(OrganizationEntity, href, token, this._onOrganizationChange.bind(this));
	}

	_onOrganizationChange(organization) {
		if (!organization) {
			return;
		}

		this._organization = organization;
		//organization object will keep track of semester object and blow it up when it blows up.
		this._organization.onSemesterChange((semester) => {
			this._semesterName = semester.name();
		});
	}
}

window.customElements.define('d2l-organization-semester-name', D2lOrganizationSemesterName);
