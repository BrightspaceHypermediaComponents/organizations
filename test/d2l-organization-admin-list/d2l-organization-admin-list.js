import { runAxe } from '@brightspace-ui/core/tools/a11y-test-helper.js';

describe('d2l-organization-admin-list', () => {
	let element;

	beforeEach(async() => {
		element = fixture('admin-list');
		await element.updateComplete;
	});

	it('should pass all axe tests', async() => {
		await runAxe(element);
	});

});
