import '../../components/d2l-organization-completion/d2l-organization-completion-tracking.js';
import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-organization-completion-tracking', () => {
	let el;

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-admin-list');
		});
	});

	beforeEach(async() => {
		el = await fixture(html`<d2l-organization-completion-tracking></d2l-organization-completion-tracking>`);
	});

	it('does not show progress tracking options when disabled', () => {

	});

	it('shows progress tracking options when enabled', () => {

	});

	it('displays warning when disabling completion tracking', () => {

	});

	it('displays completion tracking help when enabling', () => {

	});
});
