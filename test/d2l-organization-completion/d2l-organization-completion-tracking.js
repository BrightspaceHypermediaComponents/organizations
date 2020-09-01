import '../../components/d2l-organization-completion/d2l-organization-completion-tracking.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

describe('d2l-organization-completion-tracking', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-admin-list');
		});
	});

	describe('show/hide logic', () => {
		let el;
		beforeEach(async() => {
			el = await fixture(html`<d2l-organization-completion-tracking></d2l-organization-completion-tracking>`);
		});

		it('displays when completion tracking initially disabled', async() => {
			el._initialValues = { isCompletionTracked: false };
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarning').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFields')).to.have.class('d2l-hidden');
		});

		it('displays when completion tracking initally enabled', async() => {
			el._initialValues = { isCompletionTracked: true };
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarning').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFields')).to.not.have.class('d2l-hidden');
		});

		it('shows progress fields when user enables tracking', async() => {
			el._initialValues = { isCompletionTracked: false };
			await el.updateComplete;
			// simulate checkbox select
			const checkbox = el.shadowRoot.querySelector('#chkCompletionTracked');
			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarning').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFields')).to.not.have.class('d2l-hidden');
		});

		it('displays when user disables completion tracking', async() => {
			el._initialValues = { isCompletionTracked: true };
			await el.updateComplete;
			// simulate checkbox select
			const checkbox = el.shadowRoot.querySelector('#chkCompletionTracked');
			setTimeout(() => {
				checkbox.checked = false;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarning').hidden).to.be.false;
			expect(el.shadowRoot.querySelector('#progressFields')).to.have.class('d2l-hidden');
		});
	});
});
