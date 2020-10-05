import '../../components/d2l-organization-completion/d2l-organization-completion-tracking.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { trackingDisabled, trackingEnabled, trackingEnabledDisplayEnabled } from './data.js';
// /import OrganizationEntity from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

import sinon from 'sinon/pkg/sinon-esm.js';

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
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');
		});

		it('displays when completion tracking initally enabled', async() => {
			el._initialValues = { isCompletionTracked: true };
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
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
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
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
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.false;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');
		});
	});
	describe('loading href', () => {
		let el, sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
				const whatToFetch = {
					'/organization-tracking-disabled.json': trackingDisabled,
					'/organization-tracking-enabled.json': trackingEnabled,
					'/organization-display-enabled.json': trackingEnabledDisplayEnabled
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

		it('tracking disabled', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
		});
		it('tracking enabled', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-enabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
		});
		it('display disabled', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
		});
		it('display enabled', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-display-enabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
		});
	});

	describe('checkboxes and saving', () => {
		let el, sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
				const whatToFetch = {
					'/organization-tracking-disabled.json': trackingDisabled,
					'/organization-tracking-enabled.json': trackingEnabled,
					'/organization-display-enabled.json': trackingEnabledDisplayEnabled
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

		it('set tracking enabled', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;

			const checkbox = el.shadowRoot.querySelector('#chkCompletionTracked');
			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;

			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;
		});

		it('set tracking disabled', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-enabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');

			const checkbox = el.shadowRoot.querySelector('#chkCompletionTracked');
			setTimeout(() => {
				checkbox.checked = false;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;

			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;
		});

		it('set progress enabled', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-enabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;

			const checkbox = el.shadowRoot.querySelector('#chkDisplayProgress');
			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;

			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;
		});

		it('set progress disabled', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-display-enabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;

			const checkbox = el.shadowRoot.querySelector('#chkDisplayProgress');
			setTimeout(() => {
				checkbox.checked = false;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;

			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;
		});

	});

	describe('save calls', () => {
		let el, sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
				const whatToFetch = {
					'/organization-tracking-disabled.json': trackingDisabled,
					'/organization-tracking-enabled.json': trackingEnabled,
					'/organization-display-enabled.json': trackingEnabledDisplayEnabled
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

		it('saving enabling tracking and progress', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-disabled.json' token='bar'></d2l-organization-completion-tracking>`);

			const checkbox = el.shadowRoot.querySelector('#chkCompletionTracked');
			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;

			const saveButton = el.shadowRoot.querySelector('#btnSaveCompletion');
			setTimeout(() => {
				saveButton.press = true;
				saveButton.dispatchEvent(new Event('change'));
			});
			await oneEvent(saveButton, 'change');
			await el.updateComplete;

			// TODO: assert updateTrackingCompletion and updateDisplayProgress were called

		});

		it('saving enabling progress', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-enabled.json' token='bar'></d2l-organization-completion-tracking>`);

			const checkbox = el.shadowRoot.querySelector('#chkDisplayProgress');
			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;

			const saveButton = el.shadowRoot.querySelector('#btnSaveCompletion');
			setTimeout(() => {
				saveButton.press = true;
				saveButton.dispatchEvent(new Event('change'));
			});
			await oneEvent(saveButton, 'change');
			await el.updateComplete;

			// TODO: assert updateDisplayProgress was called

		});

		it('saving disable tracking', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-enabled.json' token='bar'></d2l-organization-completion-tracking>`);

			const checkbox = el.shadowRoot.querySelector('#chkDisplayProgress');
			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;

			const saveButton = el.shadowRoot.querySelector('#btnSaveCompletion');
			setTimeout(() => {
				saveButton.press = true;
				saveButton.dispatchEvent(new Event('save'));
			});
			await oneEvent(saveButton, 'save');

			const warning = el.shadowRoot.querySelector('#confirmDisableDialog');
			expect(warning.hidden).to.be.false;
			const warningButton = el.shadowRoot.querySelector('#confirmDisableButton');
			setTimeout(() => {
				warningButton.press = true;
				warningButton.dispatchEvent(new Event('confirm'));
			});
			await oneEvent(warningButton, 'confirm');
			await el.updateComplete;

			// TODO: assert updateTrackingCompletion was called

		});

		it('saving disable tracking, deny confirmation', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/organization-tracking-enabled.json' token='bar'></d2l-organization-completion-tracking>`);

			const checkbox = el.shadowRoot.querySelector('#chkDisplayProgress');
			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;

			const saveButton = el.shadowRoot.querySelector('#btnSaveCompletion');
			setTimeout(() => {
				saveButton.press = true;
				saveButton.dispatchEvent(new Event('save'));
			});
			await oneEvent(saveButton, 'save');

			const warning = el.shadowRoot.querySelector('#confirmDisableDialog');
			expect(warning.hidden).to.be.false;
			const warningButton = el.shadowRoot.querySelector('#denyDisableButton');
			setTimeout(() => {
				warningButton.press = true;
				warningButton.dispatchEvent(new Event('confirm'));
			});
			await oneEvent(warningButton, 'confirm');
			await el.updateComplete;

			// TODO: assert no updates were called

		});
	});

	/* TODO: test  orgID function is working
	describe('orgID', () => {
		let trackingDisabledJson, trackingEnabledJson;

		beforeEach(() => {
			trackingDisabledJson = trackingDisabled;
			trackingEnabledJson = trackingEnabled;
		});
		it('property correct url', () => {
			const result = trackingDisabledJson._orgID;
			expect(result).to.equal('orgID');
		});
		it('property incorrect url', async() => {
			const result = trackingEnabledJson._orgID;
			expect(result).to.equal(undefined);
		});
	});
	*/
});
