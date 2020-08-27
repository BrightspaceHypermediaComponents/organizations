import '../../components/d2l-organization-availability-set/d2l-organization-availability.js';

import { expect, fixture, html } from '@open-wc/testing';
import { Organizations, OrgUnitAvailability } from './data.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('d2l-organization-availability', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-availability');
		});
	});

	describe('entities', () => {
		let component, sandbox;
		beforeEach(async() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
				const whatToFetch = {
					'/orgUnitAvailability2.json': OrgUnitAvailability.explicit,
					'/orgUnitAvailability3.json': OrgUnitAvailability.inherit,
					'/orgUnitAvailability4.json': OrgUnitAvailability.inheritWithDescendantType,
					'/organization6606.json': Organizations.Org6606,
					'/organization6609.json': Organizations.Org6609,
					'/organization121147.json': Organizations.Org121147
				};
				return Promise.resolve({
					ok: true,
					json: () => { return Promise.resolve(whatToFetch[input]); }
				});
			});
			component = await fixture(html`<d2l-organization-availability token="whatever"></d2l-organization-availability>`);
		});

		afterEach(() => {
			sandbox.restore();
			window.D2L.Siren.EntityStore.clear();
		});

		it('renders organization availability set for explicit entity', (done) => {
			component.href = '/orgUnitAvailability2.json';

			sandbox.stub(component, 'localize')
				.withArgs('explicitItemDescription', { type: 'Course Offering', name: 'Course' })
				.returns('Explicit Item Description');

			afterNextRender(component, () => {
				expect(component._name).to.equal('Course');
				expect(component._itemDescription).to.equal('Explicit Item Description');
				done();
			});
		});

		it('renders organization availability set for inherited entity', (done) => {
			component.href = '/orgUnitAvailability3.json';

			sandbox.stub(component, 'localize')
				.withArgs('inheritItemDescription', { type: 'Department', name: 'Accounting&Financial Management' })
				.returns('Inherit Item Description');

			afterNextRender(component, () => {
				expect(component._name).to.equal('Accounting&Financial Management');
				expect(component._itemDescription).to.equal('Inherit Item Description');
				done();
			});
		});

		it('renders organization availability set for inherited with descendant type', (done) => {
			component.href = '/orgUnitAvailability4.json';

			sandbox.stub(component, 'localize')
				.withArgs('inheritItemWithDescendantTypeDescription', { type: 'Department', name: 'Accounting&Financial Management', descendantType: 'Program' })
				.returns('Inherit with descendant type Item Description');

			afterNextRender(component, () => {
				expect(component._name).to.equal('Accounting&Financial Management');
				expect(component._itemDescription).to.equal('Inherit with descendant type Item Description');
				done();
			});
		});
	});
});
