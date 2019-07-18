import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
window.D2L.Siren.WhitelistBehavior._testMode(true);
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

	describe('Check if loaded events fire.', () => {
		beforeEach(done => {
			component = fixture('d2l-organization-detail-card-fixture');
			afterNextRender(component, done);
		});

		it('should fire the text loaded event', (done) => {
			var eventSpy = sandbox.spy();
			component.addEventListener('d2l-organization-detail-card-text-loaded', eventSpy);

			component._entity = organizationEntity;

			setTimeout(() => {
				sinon.assert.called(eventSpy);
				done();
			});

		});

		it('should fire the image loaded event', (done) => {
			var eventSpy = sandbox.spy();
			component.addEventListener('d2l-organization-detail-card-image-loaded', eventSpy);

			component.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
				bubbles: true,
				composed: true
			}));
			setTimeout(() => {
				sinon.assert.called(eventSpy);
				done();
			});

		});

	});

	describe('Check if content is revealed after the reveal timeout has passed.', () => {
		beforeEach(done => {
			component = fixture('d2l-organization-detail-card-fixture');
			afterNextRender(component, done);
		});

		it('should reveal loaded text content', (done) => {
			component._entity = organizationEntity;

			setTimeout(() => {
				expect(component._forceShowText).to.equal(true);
				done();
			}, component._revealTimeoutMs);
		});

		it('should not reveal loading text content', (done) => {
			setTimeout(() => {
				expect(component._forceShowText).to.equal(false);
				done();
			}, component._revealTimeoutMs);
		});

		it('should reveal loaded image content', (done) => {
			component.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
				bubbles: true,
				composed: true
			}));

			setTimeout(() => {
				expect(component._forceShowImage).to.equal(true);
				done();
			}, component._revealTimeoutMs);
		});

		it('should not reveal loading image content', (done) => {
			setTimeout(() => {
				expect(component._forceShowImage).to.equal(false);
				done();
			}, component._revealTimeoutMs);
		});

	});
});
