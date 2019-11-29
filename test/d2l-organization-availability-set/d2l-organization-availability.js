import { Organizations, OrgUnitAvailability } from './data.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

window.D2L.Siren.WhitelistBehavior._testMode(true);

describe('d2l-organization-availability', () => {
	let sandbox;
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sandbox.stub(window.d2lfetch, 'fetch', (input) => {
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
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('explicit entity', () => {
		let component;

		before(() => {
			component = fixture('org-availability');
			component.href = '/orgUnitAvailability2.json';

			sinon.stub(component, 'localize')
				.withArgs('explicitItemDescription', { type: 'Course Offering', name: 'Course' })
				.returns('Explicit Item Description');
		});

		it('renders organization availability set', (done) => {
			afterNextRender(component, () => {
				expect(component._name).to.equal('Course');
				expect(component._itemDescription).to.equal('Explicit Item Description');
				done();
			});
		});
	});

	describe('inherit entity', () => {
		let component;

		before(() => {
			component = fixture('org-availability');
			component.href = '/orgUnitAvailability3.json';

			sinon.stub(component, 'localize')
				.withArgs('inheritItemDescription', { type: 'Department', name: 'Accounting&Financial Management' })
				.returns('Inherit Item Description');
		});

		it('renders organization availability set', (done) => {
			afterNextRender(component, () => {
				expect(component._name).to.equal('Accounting&Financial Management');
				expect(component._itemDescription).to.equal('Inherit Item Description');
				done();
			});
		});
	});

	describe('inherit with descendant type entity', () => {
		let component;

		before(() => {
			component = fixture('org-availability');
			component.href = '/orgUnitAvailability4.json';

			sinon.stub(component, 'localize')
				.withArgs('inheritItemWithDescendantTypeDescription', { type: 'Department', name: 'Accounting&Financial Management', descendantType: 'Program' })
				.returns('Inherit with descendant type Item Description');
		});

		it('renders organization availability set', (done) => {
			afterNextRender(component, () => {
				expect(component._name).to.equal('Accounting&Financial Management');
				expect(component._itemDescription).to.equal('Inherit with descendant type Item Description');
				done();
			});
		});
	});
});
