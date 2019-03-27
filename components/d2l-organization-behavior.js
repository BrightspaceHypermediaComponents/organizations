import '@polymer/polymer/polymer-legacy.js';
import 'd2l-fetch/d2l-fetch.js';
import SirenParse from 'siren-parser';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Organization = window.D2L.PolymerBehaviors.Organization || {};
/*
 *	Common methods used by organizations components.
 * @polymerBehavior D2L.PolymerBehaviors.Organization.Behavior
 */
D2L.PolymerBehaviors.Organization.Behavior = {
	_fireD2lOrganizationAccessible: function(details) {
		this.fire('d2l-organization-accessible', details);
	}
};
