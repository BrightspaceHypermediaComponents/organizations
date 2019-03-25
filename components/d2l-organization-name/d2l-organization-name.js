/**
`d2l-organization-name`

Polymer-based web component for a organization name.

@demo demo/d2l-organization-name/d2l-organization-name-demo.html Organization Name
*/
import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import '../d2l-organization-behavior.js';

/**
 * @customElement
 * @polymer
 */
class OrganizationName extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Organization.Behavior
], PolymerElement) {
	static get template() {
		return html`
			[[_organizationName]]
		`;
	}
	static get properties() {
		return {
			_organizationName: String
		};
	}

	static get observers() {
		return [
			'_loadData(entity)',
			'_sendVoiceReaderInfo(_organizationName)'
		];
	}

	static get is() { return 'd2l-organization-name'; }

	_loadData(entity) {
		this._organizationName = entity && entity.properties && entity.properties.name || '';
	}

	_sendVoiceReaderInfo(organizationName) {
		var details = {
			organization: {
				name: organizationName
			}
		};

		this._fireD2lOrganizationAccessible(details);
	}
}

window.customElements.define(OrganizationName.is, OrganizationName);
