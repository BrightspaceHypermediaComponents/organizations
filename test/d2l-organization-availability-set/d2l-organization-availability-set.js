import { OrganizationAvailabilitySet, Organizations, OrgUnitAvailability } from './data.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

window.D2L.Siren.WhitelistBehavior._testMode(true);

describe('d2l-organization-availability-set', () => {
	var component, sandbox;
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sandbox.stub(window.d2lfetch, 'fetch', (input) => {
			const whatToFetch = {
				'/organizationAvailabilitySet.json': OrganizationAvailabilitySet.default,
				'/organizationAvailabilitySetCannotAdd.json': OrganizationAvailabilitySet.cannotAdd,
				'/organizationAvailabilitySetWithoutCurrentOrgUnit.json': OrganizationAvailabilitySet.withoutCurrentOrgUnit,
				'/organizationAvailabilitySetCannotAddAndMissingCurrentOrgUnit.json': OrganizationAvailabilitySet.cannotAddAndWithoutCurrentOrgUnit,
				'/orgUnitAvailability1.json': OrgUnitAvailability.current,
				'/orgUnitAvailability2.json': OrgUnitAvailability.explicit,
				'/orgUnitAvailability3.json': OrgUnitAvailability.inherit,
				'/orgUnitAvailability4.json': OrgUnitAvailability.inheritWithDescendentType,
				'/organization6606.json': Organizations.Org6606
			};
			return Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(whatToFetch[input]); }
			});
		});

		component = fixture('org-availability-set');
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('renders organization availability set', (done) => {
		component.href = '/organizationAvailabilitySet.json';
		afterNextRender(component, () => {
			expect(component._availabilityHrefs).to.have.lengthOf(3);
			expect(component._currentOrgUnitEntity.class).to.include('current');
			expect(component._canAddAvailability).to.be.true;
			expect(component._currentOrgUnitName).to.equal('Dev');

			const currentOrgUnitElems = component.shadowRoot.querySelectorAll('d2l-current-organization-availability');
			expect(currentOrgUnitElems.length).to.equal(1);

			const availabilityElems = component.shadowRoot.querySelectorAll('d2l-organization-availability');
			expect(availabilityElems.length).to.equal(3);

			const buttonElems = component.shadowRoot.querySelectorAll('d2l-button');
			expect(buttonElems.length).to.equal(1);
			done();
		});
	});

	it('does not render Add Org Unit button when missing action', (done) => {
		component.href = '/organizationAvailabilitySetCannotAdd.json';
		afterNextRender(component, () => {
			expect(component._canAddAvailability).to.be.false;

			const buttonElems = component.shadowRoot.querySelectorAll('d2l-button');
			expect(buttonElems.length).to.equal(0);

			done();
		});
	});

	it('does not render current-organization-availability component if current org unit unchecked', (done) => {
		component.href = '/organizationAvailabilitySetWithoutCurrentOrgUnit.json';
		afterNextRender(component, () => {
			expect(component._availabilityHrefs).to.have.lengthOf(3);
			expect(component._currentOrgUnitEntity).to.be.undefined;
			expect(component._canAddAvailability).to.be.true;

			const currentOrgUnitElems = component.shadowRoot.querySelectorAll('d2l-current-organization-availability');
			expect(currentOrgUnitElems.length).to.equal(0);

			const availabilityElems = component.shadowRoot.querySelectorAll('d2l-organization-availability');
			expect(availabilityElems.length).to.equal(3);

			setTimeout(() => {
				const checkboxElems = component.shadowRoot.querySelectorAll('d2l-input-checkbox');
				expect(checkboxElems.length).to.equal(1);
				expect(checkboxElems[0].innerText.trim()).to.equal('Current Org Unit: Dev');
				done();
			}, 200);
		});
	});

	it('does not render current-organization-availability component if current org unit unchecked and does not render Add Org Units button if action is missing', (done) => {
		component.href = '/organizationAvailabilitySetCannotAddAndMissingCurrentOrgUnit.json';
		afterNextRender(component, () => {
			expect(component._currentOrgUnitEntity).to.be.undefined;
			expect(component._canAddAvailability).to.be.false;

			const currentOrgUnitElems = component.shadowRoot.querySelectorAll('d2l-current-organization-availability');
			expect(currentOrgUnitElems.length).to.equal(0);

			const buttonElems = component.shadowRoot.querySelectorAll('d2l-button');
			expect(buttonElems.length).to.equal(0);

			setTimeout(() => {
				const checkboxElems = component.shadowRoot.querySelectorAll('d2l-input-checkbox');
				expect(checkboxElems.length).to.equal(1);
				expect(checkboxElems[0].innerText.trim()).to.equal('Current Org Unit: Dev');
				done();
			}, 200);
		});
	});
});
