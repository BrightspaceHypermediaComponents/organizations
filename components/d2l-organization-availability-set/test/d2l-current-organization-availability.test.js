import '../d2l-current-organization-availability.js';

import { expect, fixture, html } from '@open-wc/testing';
import { Organizations, OrgUnitAvailability } from './data.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

const basic = html`<d2l-current-organization-availability token="whatever"></d2l-current-organization-availability>`;

describe('d2l-current-organization-availability', () => {
	let component, sandbox;
	beforeEach(async() => {
		sandbox = sinon.createSandbox();
		sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
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

		component = await fixture(basic);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-current-organization-availability');
		});
	});

	it('renders current availability', (done) => {
		component.href = '/orgUnitAvailability1.json';
		afterNextRender(component, () => {
			expect(component._name).to.equal('Dev');
			expect(component._canDelete).to.be.true;

			setTimeout(() => {
				const checkboxElems = component.shadowRoot.querySelectorAll('d2l-input-checkbox[checked]');
				expect(checkboxElems.length).to.equal(1);
				expect(checkboxElems[0].textContent.trim()).to.equal('Current Org Unit: Dev');
				done();
			}, 200);
		});
	});

	it('renders current availability with disabled checkbox', (done) => {
		component.href = '/orgUnitAvailability5.json';
		afterNextRender(component, () => {
			expect(component._name).to.equal('Dev');
			expect(component._canDelete).to.be.false;

			setTimeout(() => {
				const checkboxElems = component.shadowRoot.querySelectorAll('d2l-input-checkbox[checked][disabled]');
				expect(checkboxElems.length).to.equal(1);
				expect(checkboxElems[0].textContent.trim()).to.equal('Current Org Unit: Dev');
				done();
			}, 200);
		});
	});
});
