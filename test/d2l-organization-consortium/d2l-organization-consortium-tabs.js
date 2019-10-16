import { organization1, organization2, organization3, organization4, root1, root2, root3, root4, hasUnread, noUnread, consortium1, consortium2, consortiumRoot1, consortiumRoot2 } from './data.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';

window.D2L.Siren.WhitelistBehavior._testMode(true);

describe('d2l-organization-consortium-tabs', function() {
	var sandbox;
	beforeEach(function() {
		sandbox = sinon.sandbox.create();
		sessionStorage.clear();
		window.D2L.Siren.EntityStore.clear();
	});

	afterEach(function() {
		sandbox.restore();
	});
	describe('error cases', () => {
		[{
			whatToFetch: {
				'/consortium/root1-consortium.json': root1,
				'/consortium/root2-consortium.json': root2,
				'/consortium1.json': consortium1,
				'/consortium-root1.json': consortiumRoot1,
				'/consortium2.json': consortium1,
				'/consortium-root2.json': consortiumRoot2
			},
			name: 'displays the error tab when org fails',
			numOfFailures: 2,
			expectedLinks: 0
		},
		{
			whatToFetch: {
				'/consortium1.json': consortium1,
				'/consortium-root1.json': consortiumRoot1,
				'/consortium2.json': consortium1,
				'/consortium-root2.json': consortiumRoot2
			},
			name: 'displays the error tab when root call fails',
			numOfFailures: 2,
			expectedLinks: 0
		},
		{
			whatToFetch: {
				'/consortium/organization1-consortium.json': organization1,
				'/consortium/root1-consortium.json': root1,
				'/consortium/root2-consortium.json': root2,
				'/consortium1.json': consortium1,
				'/consortium-root1.json': consortiumRoot1,
				'/consortium2.json': consortium1,
				'/consortium-root2.json': consortiumRoot2
			},

			name: 'displays the error tab when partial failure occurs',
			numOfFailures: 1,
			expectedLinks: 1
		}].forEach(function({ name, whatToFetch, expectedLinks, numOfFailures }) {
		/** sauce doesn't seem to fully render things despite my best efforts.  uncomment if you want to verify local
		 These test work if:
		 - you run `npm run test:polymer:local`
		 - you run `npm run test:polymer:sauce` from your local machine (creds needed for sauce)
		 - you run `npx polymer serve -H 0.0.0.0` and hit the test page from another computer
		*/
			it.skip(name, function(done) {
				sandbox.stub(sessionStorage, 'setItem');
				sandbox.stub(sessionStorage, 'getItem', () => '{}');
				const fetchStub = sandbox.stub(window.d2lfetch, 'fetch', (input) => {
					let url;
					if ('string' === typeof input) {
						url = input;
					}
					if (input instanceof Request) {
						url = input.url;
					}
					const hostStrippedInput = url.replace(location.origin, '');
					const ok = !!whatToFetch[hostStrippedInput];
					return Promise.resolve({
						ok,
						status: ok ? 200 : 500,
						json: function() { if (ok === true) { return Promise.resolve(whatToFetch[hostStrippedInput]); } else { return Promise.resolve({}); }}
					});
				});
				const component = fixture('org-consortium');
				component.href = '/consortium-root1.json';
				const waitForTabs = (assertions) => {
					flush(function() {
						const alertIcon = component.shadowRoot.querySelectorAll('d2l-icon[icon="tier1:alert"]');
						if (alertIcon.length > 0) {
							assertions();
						} else {
							setTimeout(() => waitForTabs(assertions), 30);
						}
					});
				};

				waitForTabs(function() {
					afterNextRender(component, function() {
						assert.equal(fetchStub.called, true);

						const tabs = component.shadowRoot.querySelectorAll('a');
						assert.equal(tabs.length, expectedLinks, `should have ${expectedLinks} links`);
						const alertIcon = component.shadowRoot.querySelectorAll('d2l-icon[icon="tier1:alert"]');
						assert.equal(alertIcon.length, 1, 'tier1:alert');
						const errorMessage = component.shadowRoot.querySelectorAll('div.d2l-consortium-tab-content > d2l-icon[icon="tier1:alert"]')[0].parentElement;
						assert.include(errorMessage.innerText, 'Oops');
						const toolTip = component.shadowRoot.querySelectorAll('d2l-tooltip');
						assert.include(toolTip[toolTip.length - 1].innerText, 'Oops');
						assert.include(toolTip[toolTip.length - 1].innerText, numOfFailures);
						done();
					});
				});

			});
		});
		it('populates tabs that have the same data but are accessed differently', function(done) {
			sandbox.stub(window.d2lfetch, 'fetch', (input) => {
				const org2DupeName = Object.assign({}, organization2, { 'properties': { 'code': 'c1' } });
				const hostStrippedInput = input.replace(location.origin, '');
				const whatToFetch = {
					'/consortium/organization1-consortium.json': organization1,
					'/consortium/organization2-consortium.json': org2DupeName,
					'/consortium/root1-consortium.json': root1,
					'/consortium/root2-consortium.json': root2,
					'/consortium1.json': consortium1,
					'/consortium-root1.json': consortiumRoot1,
					'/consortium2.json': consortium1,
					'/consortium-root2.json': consortiumRoot2
				};
				return Promise.resolve({
					ok: !!whatToFetch[hostStrippedInput],
					json: function() { return Promise.resolve(whatToFetch[hostStrippedInput]); }
				});
			});
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';

			afterNextRender(component, function() {
				const tabs = component.shadowRoot.querySelectorAll('a');
				assert.equal(tabs.length, 2, 'should have 2 links');
				assert.equal(tabs[0].text, 'c1');
				assert.equal(tabs[1].text, 'c1');
				assert.include(tabs[0].href, '?consortium=1');
				assert.include(tabs[1].href, '?consortium=2');
				done();
			});
		});
	});
	describe('With proper fetch', function() {
		beforeEach(function() {
			sandbox.stub(window.d2lfetch, 'fetch', (input) => {
				const whatToFetch = {
					'/consortium/organization1-consortium.json': organization1,
					'/consortium/organization2-consortium.json': organization2,
					'/consortium/root1-consortium.json': root1,
					'/consortium/root2-consortium.json': root2,
					'/consortium1.json': consortium1,
					'/consortium-root1.json': consortiumRoot1,
					'/no-unread': noUnread,
					'/has-unread': hasUnread,
					'/organization3': organization3,
					'/organization4': organization4,
					'/root3': root3,
					'/root4': root4,
					'/consortium2.json': consortium2,
					'/consortium-root2.json': consortiumRoot2
				};
				const hostStrippedInput = input.replace(location.origin, '');
				return Promise.resolve({
					ok: !!whatToFetch[hostStrippedInput],
					json: function() { return Promise.resolve(whatToFetch[hostStrippedInput]); }
				});
			});
		});

		it('populates data correctly', function(done) {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';

			afterNextRender(component, function() {
				const tabs = component.shadowRoot.querySelectorAll('a');
				assert.equal(tabs.length, 2, 'should have 2 tabs');
				assert.equal(tabs[0].text, 'c1');
				assert.equal(tabs[1].text, 'Consortium 2');
				assert.include(tabs[0].href, '?consortium=1');
				assert.include(tabs[1].href, '?consortium=2');

				const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
				assert.equal(dots.length, 2);
				assert.isFalse(dots[0].hasAttribute('hidden'));
				assert.equal(tabs[0].getAttribute('aria-label'), 'Consortium 1 - You have new alerts');
				assert.isTrue(dots[1].hasAttribute('hidden'));
				assert.equal(tabs[1].getAttribute('aria-label'), 'Consortium 2');
				const errorMessage = component.shadowRoot.querySelectorAll('div.d2l-consortium-tab-content > d2l-icon[icon="tier1:alert"]');
				assert.equal(errorMessage.length, 0, 'Error tab should not be visible when no errors present');
				done();
			});
		});

		it('threshold greater than the number of tabs causes no render', function(done) {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';
			component.tabRenderThreshold = 7;

			afterNextRender(component, function() {
				const tabs = component.shadowRoot.querySelectorAll('a');
				assert.equal(tabs.length, 0, 'should have no tabs');
				const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
				assert.equal(dots.length, 0, 'should have no notification dots');
				done();
			});
		});

		it('alerts use correct token', function(done) {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';

			afterNextRender(component, function() {
				const alerts = component._alertTokensMap;
				assert.equal(alerts['/has-unread'], 'token1');
				assert.equal(alerts['/no-unread'], 'token2');
				done();
			});
		});

		it('alerts and orgs gets updated when entity changes', function(done) {
			const component = fixture('org-consortium-with-url-change');
			component.href = '/consortium-root1.json';
			setTimeout(function() {
				component.href = '/consortium-root2.json';

				afterNextRender(component, function() {
					const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
					assert.equal(dots.length, 2);
					assert.isTrue(dots[0].hasAttribute('hidden'));
					assert.isFalse(dots[1].hasAttribute('hidden'));
					done();
				});
			}, 100);
		});
	});

	describe('Do not fetch alert entities', function() {
		beforeEach(function() {
			sandbox.stub(window.d2lfetch, 'fetch', (input) => {
				const hostStrippedInput = input.replace(location.origin, '');
				const whatToFetch = {
					'/consortium/organization1-consortium.json': organization1,
					'/consortium/organization2-consortium.json': organization2,
					'/consortium/root1-consortium.json': root1,
					'/consortium/root2-consortium.json': root2,
					'/consortium1.json': consortium1,
					'/consortium-root1.json': consortiumRoot1,
					'/no-unread': null,
					'/has-unread': null,
				};
				return Promise.resolve({
					ok: !!whatToFetch[hostStrippedInput],
					json: function() { return Promise.resolve(whatToFetch[hostStrippedInput]); }
				});
			});
		});

		it('org tabs should render with no dots when alerts entities are null', function(done) {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';

			afterNextRender(component, function() {
				const tabs = component.shadowRoot.querySelectorAll('a');
				assert.equal(tabs.length, 2, 'should have 2 tabs');
				assert.equal(tabs[0].text, 'c1');
				assert.equal(tabs[1].text, 'Consortium 2');
				assert.include(tabs[0].href, '?consortium=1');
				assert.include(tabs[1].href, '?consortium=2');

				const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
				assert.equal(dots.length, 2);
				assert.isTrue(dots[0].hasAttribute('hidden'));
				assert.isTrue(dots[1].hasAttribute('hidden'));
				done();
			});
		});
	});

});
