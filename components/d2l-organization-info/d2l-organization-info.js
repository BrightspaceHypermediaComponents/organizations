/**
`d2l-organization-info`

Polymer-based web component for a organization info such as course code and semester name.

@demo demo/d2l-organization-info/d2l-organization-info-demo.html Organization Name
*/
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/mixin/entity-mixin.js';
import { OrganizationEntity } from '../../OrganizationEntity.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-icons/d2l-icon.js';
import 'd2l-icons/tier1-icons.js';
import '../d2l-organization-behavior.js';
/**
 * @customElement
 * @polymer
 */
class OrganizationInfo extends mixinBehaviors([
	D2L.PolymerBehaviors.Organization.Behavior
], EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

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

				.d2l-organization-code {
					text-transform: uppercase;
				}

			</style>

			<span>
				<span hidden$="[[!showOrganizationCode]]" class="d2l-organization-code">[[_organizationCode]]</span>
				<d2l-icon hidden$="[[!_computeShowSeparator(showOrganizationCode, showSemesterName)]]" icon="d2l-tier1:bullet"></d2l-icon>
				<span hidden$="[[!showSemesterName]]">[[_semesterName]]</span>
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
		};
	}

	static get observers() {
		return [
			'_onOrganizationChange(_entity)',
			'_setSemesterName(showSemesterName)',
			'_sendVoiceReaderInfo(showOrganizationCode, showSemesterName, _organizationCode, _semesterName)'
		];
	}

	static get is() { return 'd2l-organization-info'; }

	ready() {
		super.ready();
	}

	_onOrganizationChange(organization) {
		this._organizationCode = organization.code();
		this._setSemesterName(this.showSemesterName);
	}

	_setSemesterName(showSemesterName) {
		if (showSemesterName && this._entity) {
			this._entity.onSemesterChange((semester) => {
				this._semesterName = semester.name();
			});
		}
	}

	_computeShowSeparator(showOrganizationCode, showSemester) {
		return showSemester && showOrganizationCode;
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
