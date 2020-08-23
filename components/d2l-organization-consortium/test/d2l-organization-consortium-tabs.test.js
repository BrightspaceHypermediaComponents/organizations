import '../d2l-organization-consortium-tabs.js';

import { assert, fixture, html, oneEvent } from '@open-wc/testing';
import {
	consortium1,
	consortium2,
	consortiumRoot1,
	consortiumRoot2,
	hasUnread,
	noUnread,
	organization1,
	organization2,
	organization3,
	organization4,
	root1,
	root2,
	root3,
	root4,
} from './data.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('d2l-organization-consortium-tabs', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-consortium-tabs');
		});
	});

	describe('entities', () => {
		let component, sandbox;

		beforeEach(async() => {
			sandbox = sinon.createSandbox();
			component = await fixture(html`<d2l-organization-consortium-tabs token="token1"></d2l-organization-consortium-tabs>`);
		});

		afterEach(() => {
			sandbox.restore();
			sessionStorage.clear();
			window.D2L.Siren.EntityStore.clear();
		});

		describe('With proper fetch', () => {
			beforeEach(() => {
				sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
					const hostStrippedInput = input.replace(location.origin, '');
					const whatToFetch = {
						'/consortium/organization1-consortium.json': organization1,
						'/consortium/organization2-consortium.json': organization2,
						'/consortium/root1-consortium.json': root1,
						'/consortium/root2-consortium.json': root2,
						'/consortium1.json': consortium1,
						'/consortium-root1.json': consortiumRoot1,
						'/consortium2.json': consortium2,
						'/consortium-root2.json': consortiumRoot2,
						'/no-unread': noUnread,
						'/has-unread': hasUnread,
						'/organization3': organization3,
						'/organization4': organization4,
						'/root3': root3,
						'/root4': root4,
					};

					return Promise.resolve({
						ok: true,
						json: () => { return Promise.resolve(whatToFetch[hostStrippedInput]); }
					});
				});
			});

			it('populates data correctly', (done) => {
				component.href = '/consortium-root1.json';

				afterNextRender(component, () => {
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

			it('threshold greater than the number of tabs causes no render', (done) => {
				component.href = '/consortium-root1.json';
				component.tabRenderThreshold = 7;

				afterNextRender(component, () => {
					const tabs = component.shadowRoot.querySelectorAll('a');
					assert.equal(tabs.length, 0, 'should have no tabs');
					const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
					assert.equal(dots.length, 0, 'should have no notification dots');
					done();
				});
			});

			it('selected tab is not focusable', (done) => {
				component.href = '/consortium-root1.json';
				component.selected = '8b33e567-c616-4667-868b-fdfe9edc3a78';

				afterNextRender(component, () => {
					const firstTab = component.shadowRoot.querySelector('.d2l-tab-container');
					assert.notEqual(firstTab.querySelector('a'), '');
					const selectedTab = component.shadowRoot.querySelector('.d2l-tab-container[selected]');
					assert.equal(selectedTab.querySelector('a').href, '');
					done();
				});
			});

			it('selected tab does not show the notification dot', (done) => {
				component.href = '/consortium-root1.json';
				component.selected = '1cb16d6a-8557-4850-8846-3fa9b6174494';

				afterNextRender(component, () => {
					const selectedTab = component.shadowRoot.querySelector('.d2l-tab-container[selected]');
					assert.isTrue(selectedTab.querySelector('d2l-navigation-notification-icon').hidden);
					done();
				});
			});

			it('alerts use correct token', (done) => {
				component.href = '/consortium-root1.json';

				afterNextRender(component, () => {
					const alerts = component._alertTokensMap;
					assert.equal(alerts['/has-unread'], 'token1');
					assert.equal(alerts['/no-unread'], 'token2');
					done();
				});
			});

			it('alerts and orgs gets updated when entity changes', (done) => {
				component.href = '/consortium-root1.json';

				afterNextRender(component, () => {
					const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
					assert.equal(dots.length, 2);
					assert.isFalse(dots[0].hasAttribute('hidden'));
					assert.isTrue(dots[1].hasAttribute('hidden'));

					setTimeout(() => {
						component.href = '/consortium-root2.json';

						afterNextRender(component, () => {
							const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
							assert.equal(dots.length, 2);
							assert.isTrue(dots[0].hasAttribute('hidden'));
							assert.isTrue(dots[1].hasAttribute('hidden'));
							done();
						});
					}, 100);
				});
			});

			it('fires event when notifications appear and disappear', (done) => {
				let firstPass = true;
				component.addEventListener('d2l-organization-consortium-tabs-notification-update', (e) => {
					if (firstPass) {
						firstPass = false;
						assert.isTrue(e.detail.hasOrgTabNotifications);
						assert.equal(e.detail.notificationText, component.localize('newNotificationsAlert'));
						afterNextRender(component, () => {
							const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
							assert.equal(dots.length, 2);
							assert.isFalse(dots[0].hasAttribute('hidden'));
							assert.isTrue(dots[1].hasAttribute('hidden'));

							component.href = '/consortium-root2.json';
						});
					} else {
						assert.isFalse(e.detail.hasOrgTabNotifications);
						afterNextRender(component, () => {
							const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
							assert.equal(dots.length, 2);
							assert.isTrue(dots[0].hasAttribute('hidden'));
							assert.isTrue(dots[1].hasAttribute('hidden'));
							done();
						});
					}
				});
				component.href = '/consortium-root1.json';
			});
			it('does not fire event if the only notification is on the selected tab', (done) => {
				component.addEventListener('d2l-organization-consortium-tabs-notification-update', () => {
					assert.isOk(false, 'd2l-organization-consortium-tabs-notification-update event should not have been fired.');
				});

				component.href = '/consortium-root1.json';
				component.selected = '1cb16d6a-8557-4850-8846-3fa9b6174494';

				afterNextRender(component, () => {
					done();
				});
			});
			it('calls _announceNotifications once if notifications are present', (done) => {
				const spy = sinon.spy(component, '_announceNotifications');

				component.href = '/consortium-root1.json';

				afterNextRender(component, () => {
					assert.isTrue(spy.calledOnce);
					done();
				});
			});
			it('_announceNotifications function is not called if the only notification is on the selected tab', (done) => {
				const spy = sinon.spy(component, '_announceNotifications');

				component.href = '/consortium-root1.json';
				component.selected = '1cb16d6a-8557-4850-8846-3fa9b6174494';

				afterNextRender(component, () => {
					assert.isFalse(spy.called);
					done();
				});
			});
			it('_announceNotifications function is not called if the announcer has been muted', (done) => {
				const spy = sinon.spy(component, '_announceNotifications');

				component.muteAnnouncer = true;
				component.href = '/consortium-root1.json';

				afterNextRender(component, () => {
					assert.isFalse(spy.called);
					done();
				});
			});

			it('sends scroll request after loading complete', async() => {
				const component = await fixture(html`<d2l-organization-consortium-tabs token="token1"></d2l-organization-consortium-tabs>`);
				component.addEventListener('d2l-navigation-band-slot-scroll-request', () => {
					assert.equal(Object.keys(component._organizations).filter(key => component._organizations[key].loading), 0);
					assert.isNumber(component._requestedScrollTimeoutId);
				});
				assert.isUndefined(component._requestedScrollTimeoutId);
				component.selected = '8b33e567-c616-4667-868b-fdfe9edc3a78';
				component.href = '/consortium-root1.json';
				await oneEvent(component, 'd2l-navigation-band-slot-scroll-request');
			});

			it('displays no hrefs, tooltips, and notification dots when impersonation mode on', (done) => {
				component.impersonationMode = true;
				component.selected = '8b33e567-c616-4667-868b-fdfe9edc3a78';
				component.href = '/consortium-root1.json';

				requestAnimationFrame(() => {
					const tabs = component.shadowRoot.querySelectorAll('.d2l-consortium-tab');
					assert.isNull(tabs[0].getAttribute('href'));
					assert.isNull(tabs[1].getAttribute('href'));
					assert.equal(tabs[0].getAttribute('tabindex'), '0');
					assert.isNull(tabs[1].getAttribute('tabindex'));

					const toolTips = component.shadowRoot.querySelectorAll('d2l-tooltip');
					assert.include(toolTips[0].innerText, 'impersonating');
					assert.equal(toolTips[1].innerText, 'Consortium 2');

					const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
					assert.equal(dots.length, 2);
					assert.isFalse(dots[0].hasAttribute('hidden'));
					assert.isTrue(dots[1].hasAttribute('hidden'));
					done();
				});
			});
		});

		describe('Duplicate name', () => {
			beforeEach(() => {
				sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
					const org2DupeName = Object.assign({}, organization2, { 'properties': { 'code': 'c1' } });
					const hostStrippedInput = input.replace(location.origin, '');
					const whatToFetch = {
						'/consortium/organization1-consortium.json': organization1,
						'/consortium/organization2-consortium.json': org2DupeName,
						'/consortium/root1-consortium.json': root1,
						'/consortium/root2-consortium.json': root2,
						'/consortium1.json': consortium1,
						'/consortium-root1.json': consortiumRoot1,
						'/consortium2.json': consortium2,
						'/consortium-root2.json': consortiumRoot2
					};
					return Promise.resolve({
						ok: !!whatToFetch[hostStrippedInput],
						json: () => { return Promise.resolve(whatToFetch[hostStrippedInput]); }
					});
				});
			});

			it('populates tabs that have the same data but are accessed differently', (done) => {

				component.href = '/consortium-root1.json';

				afterNextRender(component, () => {
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

		describe('Do not fetch alert entities', () => {
			beforeEach(() => {
				sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
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
						json: () => { return Promise.resolve(whatToFetch[hostStrippedInput]); }
					});
				});
			});

			it('org tabs should render with no dots when alerts entities are null', (done) => {
				component.href = '/consortium-root1.json';

				afterNextRender(component, () => {
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

		describe('error cases', () => {
			let fetchStub;
			beforeEach(() => {
				sandbox.stub(sessionStorage, 'setItem');
				sandbox.stub(sessionStorage, 'getItem');
			});

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
			}].forEach(({ name, whatToFetch, expectedLinks, numOfFailures }) => {
				it(name, (done) => {
					fetchStub = sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
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
							json: () => { if (ok === true) { return Promise.resolve(whatToFetch[hostStrippedInput]); } else { return Promise.resolve({}); }}
						});
					});

					component.href = '/consortium-root1.json';

					afterNextRender(component, () => {
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
	});
});
