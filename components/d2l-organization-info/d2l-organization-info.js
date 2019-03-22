/**
`d2l-organization-info`

Polymer-based web component for a organization info such as course code and semester name.

@demo demo/d2l-organization-info/d2l-organization-info-demo.html Organization Name
*/
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import { Rels } from 'd2l-hypermedia-constants';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import '../d2l-organization-behavior.js';
/**
 * @customElement
 * @polymer
 */
class OrganizationInfo extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Organization.Behavior
], PolymerElement) {
	static get template() {
		return html`
			<style>
				d2l-icon {
					color: var(--d2l-color-tungsten);
					--d2l-icon-width: 18px;
					--d2l-icon-height: 18px;
				}
				d2l-icon[hidden] {
					display: none;
				}

				.uppercase {
					text-transform: uppercase;
				}

			</style>

			<span>
				<span hidden$="[[!showOrganizationCode]]" class="uppercase">[[_organizationCode]]</span>
				<d2l-icon hidden$="[[!_showSeparator]]" icon="d2l-tier1:bullet"></d2l-icon>
				<span hidden$="[[!showSemesterName]]"><d2l-organization-name href="[[_semesterHref]]" token="[[token]]"></d2l-organization-name></span>
			</span>
		`;
	}
	static get properties() {
		return {
			showOrganizationCode: {
				type: Boolean,
				value: false
			},
			showSemesterName: {
				type: Boolean,
				value: false
			},

			_semesterHref: String,
			_organizationCode: String,
			_semesterName: String,
			_showSeparator: {
				type: Boolean,
				computed: '_computeShowSeparator(showOrganizationCode, showSemesterName)'
			}
		};
	}

	static get observers() {
		return [
			'_loadData(entity)',
			'_setSemesterHref(showSemesterName)',
			'_sendVoiceReaderInfo(showOrganizationCode, showSemesterName, _organizationCode, _semesterName)'
		];
	}

	static get is() { return 'd2l-organization-info'; }

	ready() {
		super.ready();
		this.addEventListener('d2l-organization-accessible', this._onD2lOrganizationAccessible.bind(this));
	}

	_loadData(entity) {
		this._organizationCode = entity && entity.properties && entity.properties.code;
		this._semesterHref = this.showSemesterName && this._getSemesterHref(entity) || null;
	}

	_getSemesterHref(entity) {
		return entity && entity.hasLinkByRel(Rels.parentSemester) && entity.getLinkByRel(Rels.parentSemester).href;
	}

	_setSemesterHref(showSemesterName) {
		if (showSemesterName) {
			this._semesterHref = this._getSemesterHref(this.entity);
		}
	}

	_computeShowSeparator(showOrganizationCode, showSemester) {
		return showSemester && showOrganizationCode;
	}

	_onD2lOrganizationAccessible(e) {
		if (e.detail.organization.name) {
			this._semesterName = e.detail.organization.name;
		}
	}

	_sendVoiceReaderInfo(showOrganizationCode, showSemesterName, organizationCode, semesterName) {
		var details = {
			organization: {
				code: showOrganizationCode && organizationCode
			},
			semesterName: showSemesterName && semesterName
		};

		this._fireD2lOrganizationAccessible(details);
	}
}

window.customElements.define(OrganizationInfo.is, OrganizationInfo);
