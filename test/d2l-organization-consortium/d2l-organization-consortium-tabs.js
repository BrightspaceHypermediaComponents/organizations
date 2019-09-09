import { organization1, organization2, organization3, organization4, root1, root2, root3, root4, hasUnread, noUnread, consortium1, consortium2, consortiumRoot1, consortiumRoot2 } from './data.js';
window.D2L.Siren.WhitelistBehavior._testMode(true);

describe('d2l-organization-consortium-tabs', () => {
	var sandbox;
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sessionStorage.clear();
	});

	afterEach(() => {
		sandbox.restore();
		window.D2L.Siren.EntityStore.clear();
	});
	describe('error cases', () =>{
		beforeEach(() => {
			sandbox.stub(window.d2lfetch, 'fetch', (input) => {
				const org2DupeName = Object.assign({}, organization2, {'properties':{'code':'c1'}});
				const whatToFetch = {
					'../data/consortium/organization1-consortium.json': organization1,
					'../data/consortium/organization2-consortium.json': org2DupeName,
					'../data/consortium/root1-consortium.json': root1,
					'../data/consortium/root2-consortium.json': root2,
					'http://localhost:8081/consortium1.json': consortium1,
					'/consortium-root1.json': consortiumRoot1,
					'http://localhost:8081/consortium2.json': consortium1,
					'/consortium-root2.json': consortiumRoot2
				};
				return Promise.resolve({
					ok: !!whatToFetch[input],
					json: () => { return Promise.resolve(whatToFetch[input]); }
				});
			});
		});

		it('populates tabs that have the same data but are accessed differently', (done) => {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';

			flush(function() {
				const tabs = component.shadowRoot.querySelectorAll('a');
				assert.equal(tabs.length, 2, 'should have 2 tabs');
				assert.equal(tabs[0].text, 'c1');
				assert.equal(tabs[1].text, 'c1');
				assert.include(tabs[0].href, '?consortium=1');
				assert.include(tabs[1].href, '?consortium=2');

				done();
			});
		});
	});
	describe('With proper fetch', () => {
		beforeEach(() => {
			sandbox.stub(window.d2lfetch, 'fetch', (input) => {
				const whatToFetch = {
					'../data/consortium/organization1-consortium.json': organization1,
					'../data/consortium/organization2-consortium.json': organization2,
					'../data/consortium/root1-consortium.json': root1,
					'../data/consortium/root2-consortium.json': root2,
					'http://localhost:8081/consortium1.json': consortium1,
					'/consortium-root1.json': consortiumRoot1,
					'/no-unread': noUnread,
					'/has-unread': hasUnread,
					'/organization3': organization3,
					'/organization4': organization4,
					'/root3': root3,
					'/root4': root4,
					'http://localhost:8081/consortium2.json': consortium2,
					'/consortium-root2.json': consortiumRoot2
				};
				return Promise.resolve({
					ok: !!whatToFetch[input],
					json: () => { return Promise.resolve(whatToFetch[input]); }
				});
			});
		});

		it('populates data correctly', (done) => {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';

			flush(function() {
				const tabs = component.shadowRoot.querySelectorAll('a');
				assert.equal(tabs.length, 2, 'should have 2 tabs');
				assert.equal(tabs[0].text, 'c1');
				assert.equal(tabs[1].text, 'Consortium 2');
				assert.include(tabs[0].href, '?consortium=1');
				assert.include(tabs[1].href, '?consortium=2');

				const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
				assert.equal(dots.length, 2);
				assert.isFalse(dots[0].hasAttribute('hidden'));
				assert.isTrue(dots[1].hasAttribute('hidden'));
				done();
			});
		});

		it('threshold greater than the number of tabs causes no render', (done) => {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';
			component.tabRenderThreshold = 7;

			flush(function() {
				const tabs = component.shadowRoot.querySelectorAll('a');
				assert.equal(tabs.length, 0, 'should have no tabs');
				const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
				assert.equal(dots.length, 0, 'should have no notification dots');
				done();
			});
		});

		it('alerts use correct token', (done) => {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';

			flush(function() {
				const alerts = component._alertTokensMap;
				assert.equal(alerts['/has-unread'], 'token1');
				assert.equal(alerts['/no-unread'], 'token2');
				done();
			});
		});

		it('alerts and orgs gets updated when entity changes', (done) => {
			const component = fixture('org-consortium-with-url-change');
			component.href = '/consortium-root1.json';
			setTimeout(() => {
				component.href = '/consortium-root2.json';

				flush(function() {
					const dots = component.shadowRoot.querySelectorAll('d2l-navigation-notification-icon');
					assert.equal(dots.length, 2);
					assert.isTrue(dots[0].hasAttribute('hidden'));
					assert.isFalse(dots[1].hasAttribute('hidden'));
					done();
				});
			}, 100);
		});
	});

	describe('Do not fetch alert entities', () => {
		beforeEach(() => {
			sandbox.stub(window.d2lfetch, 'fetch', (input) => {
				const whatToFetch = {
					'../data/consortium/organization1-consortium.json': organization1,
					'../data/consortium/organization2-consortium.json': organization2,
					'../data/consortium/root1-consortium.json': root1,
					'../data/consortium/root2-consortium.json': root2,
					'http://localhost:8081/consortium1.json': consortium1,
					'/consortium-root1.json': consortiumRoot1,
					'/no-unread': null,
					'/has-unread': null,
				};
				return Promise.resolve({
					ok: !!whatToFetch[input],
					json: () => { return Promise.resolve(whatToFetch[input]); }
				});
			});
		});

		it('org tabs should render with no dots when alerts entities are null', (done) => {
			const component = fixture('org-consortium');
			component.href = '/consortium-root1.json';

			flush(function() {
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
