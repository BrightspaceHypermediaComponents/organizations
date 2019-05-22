import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';

describe('d2l-organization-detail-card', () => {

	var component,
		sandbox,
		organizationEntity,
		onOrganizationChangeStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('d2l-organization-detail-card-fixture');
		onOrganizationChangeStub = sinon.stub();

		organizationEntity = {
			self: function() { return 'organizationHref'; },
			description: function() { return 'description'; },
			sequenceLink: function() { return 'sequenceLink'; },
			organizationHomepageUrl: function() { return 'organizationHomepageUrl'; },
			startDate: function() { return undefined; },
			endDate: function() { return undefined; }
		};

		onOrganizationChangeStub.callsArgWith(0, organizationEntity);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('should fetch the organization', done => {
		component._entity = organizationEntity;
		afterNextRender(component, () => {
			expect(component._organizationUrl).to.equal('organizationHref');
			expect(component._description).to.equal('description');
			expect(component._sequenceLink).to.equal('sequenceLink');
			expect(component._organizationHomepageUrl).to.equal('organizationHomepageUrl');
			expect(!!component._showTags).to.equal(false);
			done();
		});
	});
});
