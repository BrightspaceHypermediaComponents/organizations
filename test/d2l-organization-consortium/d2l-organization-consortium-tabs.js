import {organization1, organization2, root1, root2, consortium} from './data.js';

describe('d2l-organization-consortium-tabs', () => {
	var sandbox;
	beforeEach(() => {
		sandbox = sinon.sandbox.create();
		sandbox.stub(window.d2lfetch, 'fetch', (input) => {
			const whatToFetch = {
				'../data/consortium/organization1-consortium.json': organization1,
				'../data/consortium/organization2-consortium.json': organization2,
				'../data/consortium/root1-consortium.json': root1,
				'../data/consortium/root2-consortium.json': root2,
				'/consortium.json': consortium,
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

	it('populates data correctly', (done) => {
		const component = fixture('org-consortium');
		component.href = '/consortium.json';

		flush(function() {
			const tabs = component.shadowRoot.querySelectorAll('a');
			assert.equal(tabs.length, 2, 'should have 2 tabs');
			assert.equal(tabs[0].text, 'c1');
			assert.equal(tabs[1].text, 'Consortium 2');
			assert.include(tabs[0].href, '?consortium=1');
			assert.include(tabs[1].href, '?consortium=2');
			done();
		});
	});
});
