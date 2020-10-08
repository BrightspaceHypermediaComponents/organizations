import '../../components/d2l-organization-completion/d2l-organization-completion-tracking.js';
import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import { trackingDisabledProgressDisabled, trackingEnabledDisplayEnabled, trackingEnabledProgressDisabled } from './data.js';
// import OrganizationEntity from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

import sinon from 'sinon/pkg/sinon-esm.js';

describe.only('d2l-organization-completion-tracking', () => {

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

		it.skip('displays when completion tracking initially disabled', async() => {
			el._initialValues = { isCompletionTracked: false };
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');
		});

		it.skip('displays when completion tracking initally enabled', async() => {
			el._initialValues = { isCompletionTracked: true };
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
		});

		it.skip('shows progress fields when user enables tracking', async() => {
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

		it.skip('displays when user disables completion tracking', async() => {
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
	describe('UI state after load', () => {
		let el, sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
				const whatToFetch = {
					'/tracking-disabled-progress-disabled.json': trackingDisabledProgressDisabled,
					'/tracking-enabled-progress-disabled.json': trackingEnabledProgressDisabled,
					'/tracking-enabled-progress-enabled.json': trackingEnabledDisplayEnabled
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

		it('should show unchecked completion tracking and hidden display progress', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-disabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
			expect(el.shadowRoot.querySelector('#btnCancelCompletion').disabled).to.be.false;
		});

		it('should show checked completion tracking and unchecked display progress', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).not.to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
			expect(el.shadowRoot.querySelector('#btnCancelCompletion').disabled).to.be.false;
		});

		it('should show checked completion tracking and checked display progress', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-enabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).not.to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
			expect(el.shadowRoot.querySelector('#btnCancelCompletion').disabled).to.be.false;
		});
	});

	describe('making changes', () => {
		let el, sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
				const whatToFetch = {
					'/tracking-disabled-progress-disabled.json': trackingDisabledProgressDisabled,
					'/tracking-enabled-progress-disabled.json': trackingEnabledProgressDisabled,
					'/tracking-enabled-progress-enabled.json': trackingEnabledDisplayEnabled
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

		it('set tracking checked and then revert the change', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-disabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			const checkbox = el.shadowRoot.querySelector('#chkCompletionTracked');
			// assert initial state
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;

			// check and assert changes
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
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;

			// undo changes and assert state
			setTimeout(() => {
				checkbox.checked = false;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
		});

		it('set tracking unchecked and then revert the change', async() => {
			// assert initial state
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;

			// uncheck and assert changes
			const checkbox = el.shadowRoot.querySelector('#chkCompletionTracked');
			setTimeout(() => {
				checkbox.checked = false;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.false;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;

			// undo changes and assert state
			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
		});

		it('set display progress checked and then revert the change', async() => {
			// assert initial state
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;

			// check and assert changes
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
			// undo changes and assert state
			setTimeout(() => {
				checkbox.checked = false;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
		});

		it('set display progress unchecked then revert the change', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-enabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;

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

			setTimeout(() => {
				checkbox.checked = true;
				checkbox.dispatchEvent(new Event('change'));
			});
			await oneEvent(checkbox, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
		});
	});

	describe('save changes', () => {
		let el, sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
				const whatToFetch = {
					'/tracking-disabled-progress-disabled.json': trackingDisabledProgressDisabled,
					'/tracking-enabled-progress-disabled.json': trackingEnabledProgressDisabled,
					'/tracking-enabled-progress-enabled.json': trackingEnabledDisplayEnabled,
					'/put-track-completion.json': trackingEnabledProgressDisabled,
					'/put-display-progress.json': trackingEnabledDisplayEnabled,
					'/6609': trackingDisabledProgressDisabled,
				};
				return Promise.resolve({
					ok: true,
					json: () => {
						console.log('----input: ' + input);// eslint-disable-line
						const key = input.substring(input.lastIndexOf('/'));
						console.log('----key: ' + key);// eslint-disable-line
						return Promise.resolve(whatToFetch[key]);
					}
				});
			});

		});

		afterEach(() => {
			sandbox.restore();
		});

		it.only('saving enabled tracking and progress', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/6609' token='bar'></d2l-organization-completion-tracking>`);
			const chkCompletionTracked = el.shadowRoot.querySelector('#chkCompletionTracked');
			// 	const chkDisplayProgress = el.shadowRoot.querySelector('#chkDisplayProgress');
			console.log('What a heck');//eslint-disable-line
			setTimeout(() => {
				chkCompletionTracked.checked = true;
				chkCompletionTracked.dispatchEvent(new Event('change'));
			//chkDisplayProgress.checked = true;
			//chkDisplayProgress.dispatchEvent(new Event('change'));
			});
			await oneEvent(chkCompletionTracked, 'change');
			await el.updateComplete;

			//await oneEvent(chkDisplayProgress, 'change');
			//while (await el.updateComplete) {
				console.log('waiting for pending update');//eslint-disable-line
			//}

			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true; // is checked automatically on completion track check.

			expect(el._entity.isCompletionTracked()).to.be.false;
			expect(el._entity.isProgressDisplayed()).to.be.false;
			expect(el._newValues.isCompletionTracked).to.be.true;
			expect(el._newValues.isProgressDisplayed).to.be.true;
			/*
			const saveButton = el.shadowRoot.querySelector('#btnSaveCompletion');
			setTimeout(() => {
				saveButton.press = true;
				saveButton.dispatchEvent(new Event('click'));
			});
			await oneEvent(saveButton, 'click');/
			*/
			await el._onSaveClick();
			await el.updateComplete;
			//while (await el.updateComplete) {
				console.log('waiting for pending update');//eslint-disable-line
			//}

			//expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			//expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el._entity.isCompletionTracked()).to.be.true;
			expect(el._entity.isProgressDisplayed()).to.be.true;
			/*
			setTimeout(() => {
				chkDisplayProgress.checked = true;
				chkDisplayProgress.dispatchEvent(new Event('change'));
			//chkDisplayProgress.checked = true;
			//chkDisplayProgress.dispatchEvent(new Event('change'));
			});
			await oneEvent(chkDisplayProgress, 'change');
			await el.updateComplete;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			await el._onSaveClick();
			expect(el._entity.isCompletionTracked()).to.be.true;
			expect(el._entity.isProgressDisplayed()).to.be.true;
			// TODO: assert updateTrackingCompletion and updateDisplayProgress were called
			*/
		});

		it('saving enabling progress', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);

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
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);

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
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);

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
		let trackingDisabledProgressDisabledJson, trackingEnabledJson;

		beforeEach(() => {
			trackingDisabledProgressDisabledJson = trackingDisabledProgressDisabled;
			trackingEnabledJson = trackingEnabled;
		});
		it('property correct url', () => {
			const result = trackingDisabledProgressDisabledJson._orgID;
			expect(result).to.equal('orgID');
		});
		it('property incorrect url', async() => {
			const result = trackingEnabledJson._orgID;
			expect(result).to.equal(undefined);
		});
	});
	*/
});
