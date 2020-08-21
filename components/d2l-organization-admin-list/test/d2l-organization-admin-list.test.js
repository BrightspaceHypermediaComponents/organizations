import '../d2l-organization-admin-list.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-organization-admin-list', () => {
	let el;
	let collectionEntity;
	const basic = html`<d2l-organization-admin-list titleText="Learning Paths"></d2l-organization-admin-list>`;

	describe('accessibility', () => {
		it('should pass all axe tests', async() => {
			el = await fixture(basic);
			await expect(el).to.be.accessible();
		});
	});

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-admin-list');
		});
	});

	beforeEach(async() => {
		el = await fixture(basic);
		collectionEntity = {};
	});

	it('should reset items on collection changed', done => {
		collectionEntity.onOrganizationsChange = () => {};
		collectionEntity.totalPages = () => 1;
		collectionEntity.currentPage = () => 1;
		collectionEntity.subEntitiesLoaded = () => Promise.resolve();
		el._items = ['non', 'empty', 'items', 'array'];

		el._onOrganizationCollectionChanged(collectionEntity);

		collectionEntity.subEntitiesLoaded().then(() => {
			expect(el._items).to.be.empty;
			done();
		});
	});
});
