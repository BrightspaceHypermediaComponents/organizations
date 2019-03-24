import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from './entity-store/entity-mixin.js';
import './components/d2l-organization-entity.js';

/**
 * Uses the lit element dom elements to get the entity information
 * @customElement
 * @polymer
 */
class D2lOrganizationSemesterNameDom extends EntityMixin(PolymerElement) {
	static get template() {
		return html`
			[[_semesterName]]
			<d2l-organization-entity href="[[href]]" token="[[token]]" on-change="_handleOrganizationChanged" ></d2l-organization-entity>
            <d2l-organization-entity href="[[_semesterHref]]" token="[[token]]" on-change="_handleSemesterChanged" ><d2l-organization-entity>
		`;
	}

	static get properties() {
		return {
			href: {
				type: String,
				reflectToAttribute: true
			},
			token: String,
			_semesterName: String,
			_semesterHref: String
		};
	}
	static get observers() {
		return [
			'_onOrganizationChange(_entity)'
		];
	}

	_handleOrganizationChanged(organization) {
		if (!organization || !organization.detail || !organization.detail.entity) {
			return;
		}
		this._semesterHref = organization.detail.entity.semesterHref();
	}
	_handleSemesterChanged(semester) {
		if (!semester || !semester.detail || !semester.detail.entity) {
			return;
		}
		this._semesterName = semester.detail.entity.name();
	}
}

window.customElements.define('d2l-organization-semester-name-dom', D2lOrganizationSemesterNameDom);
