import { Organizations, OrgUnitAvailability } from './data.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

window.D2L.Siren.WhitelistBehavior._testMode(true);

describe('d2l-current-organization-availability', () => {
	var component, sandbox;
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sandbox.stub(window.d2lfetch, 'fetch', (input) => {
			const whatToFetch = {
				'/orgUnitAvailability1.json': OrgUnitAvailability.current,
				'/organization6606.json': Organizations.Org6606,
				'/orgUnitAvailability5.json': OrgUnitAvailability.currentCannotDelete
			};
			return Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(whatToFetch[input]); }
			});
		});

		component = fixture('current-org-availability');
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('renders current availability', (done) => {
		component.href = '/orgUnitAvailability1.json';
		afterNextRender(component, () => {
			expect(component._name).to.equal('Dev');
			expect(component._canDeleteAvailability).to.be.true;

			const checkboxElems = component.shadowRoot.querySelectorAll('d2l-input-checkbox[checked]');
			expect(checkboxElems.length).to.equal(1);

			// This nested afterNextRender is required for the test to pass
			afterNextRender(component, () => {
				expect(checkboxElems[0].textContent.trim()).to.equal('Current Org Unit: Dev');
				done();
			});
		});
	});

	it('renders current availability with disabled checkbox', (done) => {
		component.href = '/orgUnitAvailability5.json';
		afterNextRender(component, () => {
			expect(component._name).to.equal('Dev');
			expect(component._canDeleteAvailability).to.be.false;

			const checkboxElems = component.shadowRoot.querySelectorAll('d2l-input-checkbox[checked][disabled]');
			expect(checkboxElems.length).to.equal(1);
			expect(checkboxElems[0].textContent.trim()).to.equal('Current Org Unit: Dev');

			done();
		});
	});
});
