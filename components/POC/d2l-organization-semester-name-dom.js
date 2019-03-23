import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from './entity-store/entity-mixin.js';
import './components/d2l-organization-entity.js';

/**
 * @customElement
 * @polymer
 */
class D2lOrganizationSemesterNameDom extends EntityMixin(PolymerElement) {
	static get template() {
		return html`
			[[_semesterName]]
			<d2l-organization-entity href="[[href]]" token="[[token]]" on-change="_handleOrganizationChanged" ></d2l-organization-entity>
            <d2l-organization-entity href="[[semesterHref]]" token="[[token]]" on-change="_handleSemesterChanged" ><d2l-organization-entity>
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
		if (!organization) {
			return;
		}
		this._semesterHref = organization.semesterHref();
	}
	_handleSemesterChanged(semester) {
		this._semesterName = semester.name();
	}
}

window.customElements.define('d2l-organization-semester-name-dom', D2lOrganizationSemesterNameDom);
