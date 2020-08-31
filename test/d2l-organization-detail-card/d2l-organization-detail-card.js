import '../../components/d2l-organization-detail-card/d2l-organization-detail-card.js';

import { expect, fixture, html } from '@open-wc/testing';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('d2l-organization-detail-card', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-detail-card');
		});
	});

	describe('entities', () => {

		let component,
			sandbox,
			organizationEntity;

		beforeEach(async() => {
			sandbox = sinon.createSandbox();

			component = await fixture(html`<d2l-organization-detail-card></d2l-organization-detail-card>`);
			const onSequenceChangeStub = sinon.stub();

			organizationEntity = {
				self: () => '/organization',
				name: () => 'organization',
				description: () => 'description',
				sequenceLink: () => '/rootSequenceHref',
				organizationHomepageUrl: () => 'organizationHomepageUrl',
				startDate: () => undefined,
				endDate: () => undefined,
				onSequenceChange: onSequenceChangeStub
			};

			const module1 = {
				self: () => '/module1',
				index: () => 0,
				completion: () => {
					return {
						total: 5,
						completed: 5,
						isCompleted: true
					};
				}
			};

			const module2 = {
				self: () => '/module2',
				index: () => 1,
				completion: () => {
					return {
						total: 6,
						completed: 2,
						isCompleted: false
					};
				}
			};

			const module3 = {
				self: () => '/module3',
				index: () => 2,
				completion: () => {
					return {
						total: 0,
						completed: 0,
						isCompleted: false
					};
				}
			};

			const rootSequenceEntity = {
				self: () => '/rootSequenceHref',
				onSubSequencesChange: (onChange) => {
					onChange(module1);
					onChange(module3);
					onChange(module2);
				}
			};

			onSequenceChangeStub.callsArgWith(0, rootSequenceEntity);

			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
				const whatToFetch = {
					'/organization': organizationEntity,
					'/rootSequenceHref': rootSequenceEntity,
					'/module1': module1,
					'/module2': module2,
					'/module3': module3
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

		it('should fetch the organization', done => {
			component._entity = organizationEntity;
			afterNextRender(component, () => {
				expect(component._organizationUrl).to.equal('/organization');
				expect(component._description).to.equal('description');
				expect(component._sequenceLink).to.equal('/rootSequenceHref');
				expect(component._organizationHomepageUrl).to.equal('organizationHomepageUrl');
				expect(!!component._showTags).to.equal(false);
				done();
			});
		});

		describe('Show the proper progress', () => {
			beforeEach(done => {
				afterNextRender(component, done);
			});

			it('Progress should track modules', () => {
				component._entity = organizationEntity;
				expect(component._modulesComplete.value).to.equal(1);
				expect(component._modulesComplete.max).to.equal(2);
			});

		});

		describe('Check if loaded events fire.', () => {
			beforeEach(done => {
				afterNextRender(component, done);
			});

			it('should fire the text loaded event', (done) => {
				const eventSpy = sandbox.spy();
				component.addEventListener('d2l-organization-detail-card-text-loaded', eventSpy);

				component._entity = organizationEntity;

				setTimeout(() => {
					sinon.assert.called(eventSpy);
					done();
				}, 250);

			});

			it('should fire the image loaded event', (done) => {
				const eventSpy = sandbox.spy();
				component.addEventListener('d2l-organization-detail-card-image-loaded', eventSpy);

				component.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
					bubbles: true,
					composed: true
				}));
				setTimeout(() => {
					sinon.assert.called(eventSpy);
					done();
				}, 250);

			});

		});

		describe('Check if content is revealed after the reveal timeout has passed.', () => {
			const maxTimeout = 5000; // needed because the revealTimoutMs is by default set to 2000
			beforeEach(done => {
				afterNextRender(component, done);
			});

			it('should reveal loaded text content', (done) => {
				component._entity = organizationEntity;
				setTimeout(() => {
					expect(!!component._forceShowText).to.be.true;
					done();
				}, component._revealTimeoutMs);
			}).timeout(maxTimeout);

			it('should not reveal loading text content', (done) => {
				setTimeout(() => {
					expect(!!component._forceShowText).to.be.false;
					done();
				}, component._revealTimeoutMs);
			}).timeout(maxTimeout);

			it('should reveal loaded image content', (done) => {
				component.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
					bubbles: true,
					composed: true
				}));

				setTimeout(() => {
					expect(!!component._forceShowImage).to.be.true;
					done();
				}, component._revealTimeoutMs);
			}).timeout(maxTimeout);

			it('should not reveal loading image content', (done) => {
				setTimeout(() => {
					expect(!!component._forceShowImage).to.be.false;
					done();
				}, component._revealTimeoutMs);
			}).timeout(maxTimeout);

		});
	});
});
