import '../../components/d2l-organization-completion/d2l-organization-completion-tracking.js';
import { expect, fixture, html, oneEvent, waitUntil } from '@open-wc/testing';
import { trackingDisabledProgressDisabled, trackingDisabledProgressEnabled, trackingEnabledDisplayEnabled, trackingEnabledProgressDisabled } from './data.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';

import sinon from 'sinon/pkg/sinon-esm.js';

const ENABLED = true;
const DISABLED = false;

const CHECKED = true;
const UNCHECKED = false;

function setupD2lFetchMock(sandbox, whatToFetchObj) {
	sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
		const whatToFetch = Object.assign({}, whatToFetchObj);
		return Promise.resolve({
			ok: true,
			json: () => {
				let path;
				try {
					path = new URL(input).pathname; // match only by pathname if request has full url
				} catch (e) {
					path = input;
				}
				return Promise.resolve(whatToFetch[path]);
			}
		});
	});
}

async function clickBtn(el, selector) {
	const btn = el.shadowRoot.querySelector(selector);
	setTimeout(() => btn.click());
	await oneEvent(btn, 'click');
	await el.updateComplete;
}

async function clickSave(el) {
	await clickBtn(el, '#btnSaveCompletion');
}

async function waitForCompletionTrackingToBe(expected, el) {
	await waitUntil(() => {return el._entity.isCompletionTracked() === expected;}, 'wait for completion tracking change to be applied');
	expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.equal(expected);
	expect(el._trackCompletion).to.be.equal(expected);
}

async function waitForDisplayProgressToBe(expected, el) {
	await waitUntil(() => {return el._entity.isProgressDisplayed() === expected;}, 'wait for display progress change to be applied');
	expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.equal(expected);
	expect(el._displayProgress).to.be.equal(expected);
}

async function setCheckbox(state, selector,  el) {
	const checkbox = el.shadowRoot.querySelector(selector);
	setTimeout(() => {
		checkbox.checked = state;
		checkbox.dispatchEvent(new Event('change'));
	});
	await oneEvent(checkbox, 'change');
	await el.updateComplete;
	expect(checkbox.checked).to.be.equal(state);
}

async function confirmDisable(el, buttonSelector) {
	await waitUntil(() => {
		return el.shadowRoot.querySelector('#confirmDisableDialog')._state === 'showing';
	}, 'wait confirmDisableDialog opened');
	await clickBtn(el, buttonSelector);
	await waitUntil(() => {
		return !el.shadowRoot.querySelector('#confirmDisableDialog').opened &&  !el.shadowRoot.querySelector('#confirmDisableDialog')._state;
	}, 'wait confirmDisableDialog closed');
}

describe('d2l-organization-completion-tracking', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-admin-list');
		});
	});

	describe('UI state after load', () => {
		let el, sandbox;

		beforeEach(() => {
			sandbox = sinon.createSandbox();
			setupD2lFetchMock(sandbox, {
				'/tracking-disabled-progress-disabled.json': trackingDisabledProgressDisabled,
				'/tracking-enabled-progress-disabled.json': trackingEnabledProgressDisabled,
				'/tracking-enabled-progress-enabled.json': trackingEnabledDisplayEnabled
			});
		});

		afterEach(() => {
			sandbox.restore();
			window.D2L.Siren.EntityStore.clear();
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
			setupD2lFetchMock(sandbox, {
				'/tracking-disabled-progress-disabled.json': trackingDisabledProgressDisabled,
				'/tracking-enabled-progress-disabled.json': trackingEnabledProgressDisabled,
				'/tracking-enabled-progress-enabled.json': trackingEnabledDisplayEnabled
			});
		});

		afterEach(() => {
			sandbox.restore();
			window.D2L.Siren.EntityStore.clear();
		});

		it('set tracking checked and then revert the change', async() => {
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-disabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			// assert initial state
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');

			// apply change
			await setCheckbox(CHECKED, '#chkCompletionTracked', el);

			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;

			// rollback
			await setCheckbox(UNCHECKED, '#chkCompletionTracked', el);

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
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');

			// apply change
			await setCheckbox(UNCHECKED, '#chkCompletionTracked', el);

			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.false;
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.have.class('d2l-hidden');

			// rollback
			await setCheckbox(CHECKED, '#chkCompletionTracked', el);

			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;
			expect(el.shadowRoot.querySelector('#disableWarningAlert').hidden).to.be.true;
			expect(el.shadowRoot.querySelector('#chkCompletionHelp')).to.have.class('d2l-hidden');
		});

		it('set display progress checked and then revert the change', async() => {
			// assert initial state
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-disabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;

			// apply change
			await setCheckbox(CHECKED, '#chkDisplayProgress', el);

			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;

			// rollback
			await setCheckbox(UNCHECKED, '#chkDisplayProgress', el);

			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;
		});

		it('set display progress unchecked then revert the change', async() => {
			// assert initial state
			el = await fixture(html`<d2l-organization-completion-tracking href='/tracking-enabled-progress-enabled.json' token='bar'></d2l-organization-completion-tracking>`);
			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.true;

			// apply change
			await setCheckbox(UNCHECKED, '#chkDisplayProgress', el);

			expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.true;
			expect(el.shadowRoot.querySelector('#progressFieldsContainer')).to.not.have.class('d2l-hidden');
			expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
			expect(el.shadowRoot.querySelector('#btnSaveCompletion').disabled).to.be.false;

			// rollback
			await setCheckbox(CHECKED, '#chkDisplayProgress', el);

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
		});

		afterEach(() => {
			sandbox.restore();
			window.D2L.Siren.EntityStore.clear();
		});

		it('Enable tracking and progress', async() => {
			setupD2lFetchMock(sandbox, {
				'/6609': trackingDisabledProgressDisabled,
				'/enable-tracking': trackingEnabledProgressDisabled,
				'/enable-progress': trackingEnabledDisplayEnabled
			});

			el = await fixture(html`<d2l-organization-completion-tracking href='/6609' token='bar'></d2l-organization-completion-tracking>`);

			await waitForCompletionTrackingToBe(DISABLED, el);
			await waitForDisplayProgressToBe(DISABLED, el);

			await setCheckbox(CHECKED, '#chkCompletionTracked', el);
			await clickSave(el);

			await waitForCompletionTrackingToBe(ENABLED, el);
			await waitForDisplayProgressToBe(ENABLED, el);
		});

		it('Enable progress', async() => {
			setupD2lFetchMock(sandbox, {
				'/6609': trackingEnabledProgressDisabled,
				'/enable-progress': trackingEnabledDisplayEnabled
			});
			el = await fixture(html`<d2l-organization-completion-tracking href='/6609' token='bar'></d2l-organization-completion-tracking>`);
			await waitForCompletionTrackingToBe(ENABLED, el);
			await waitForDisplayProgressToBe(DISABLED, el);

			await setCheckbox(CHECKED, '#chkDisplayProgress', el);
			await clickSave(el);

			await waitForCompletionTrackingToBe(ENABLED, el);
			await waitForDisplayProgressToBe(ENABLED, el);

		});

		it('Disable progress', async() => {
			setupD2lFetchMock(sandbox, {
				'/6609': trackingEnabledDisplayEnabled,
				'/disable-progress': trackingEnabledProgressDisabled
			});
			el = await fixture(html`<d2l-organization-completion-tracking href='/6609' token='bar'></d2l-organization-completion-tracking>`);
			await waitForCompletionTrackingToBe(ENABLED, el);
			await waitForDisplayProgressToBe(ENABLED, el);

			await setCheckbox(UNCHECKED, '#chkDisplayProgress', el);
			await clickSave(el);

			await waitForCompletionTrackingToBe(ENABLED, el);
			await waitForDisplayProgressToBe(DISABLED, el);

		});

		it('Disable tracking', async() => {
			setupD2lFetchMock(sandbox, {
				'/6609': trackingEnabledDisplayEnabled,
				'/disable-tracking': trackingDisabledProgressEnabled,
				'/disable-progress': trackingDisabledProgressDisabled
			});
			el = await fixture(html`<d2l-organization-completion-tracking href='/6609' token='bar'></d2l-organization-completion-tracking>`);
			await waitForCompletionTrackingToBe(ENABLED, el);
			await waitForDisplayProgressToBe(ENABLED, el);

			await setCheckbox(UNCHECKED, '#chkCompletionTracked', el);
			await clickSave(el);
			await confirmDisable(el, '#confirmDisableButton');

			await waitForCompletionTrackingToBe(DISABLED, el);
			await waitForDisplayProgressToBe(DISABLED, el);
		});

		it('Cancel disable tracking', async() => {
			setupD2lFetchMock(sandbox, {
				'/6609': trackingEnabledDisplayEnabled,
				'/disable-tracking': trackingDisabledProgressDisabled
			});
			el = await fixture(html`<d2l-organization-completion-tracking href='/6609' token='bar'></d2l-organization-completion-tracking>`);
			await waitForCompletionTrackingToBe(ENABLED, el);
			await waitForDisplayProgressToBe(ENABLED, el);

			await setCheckbox(UNCHECKED, '#chkCompletionTracked', el);
			await clickSave(el);
			await confirmDisable(el, '#denyDisableButton');

			try {
				await waitForCompletionTrackingToBe(DISABLED, el); // should throw if all works correctly
				expect(el._entity.isCompletionTracked()).to.be(ENABLED); // should throw if cancel button does not work correctly
			} catch (e) {
				// Assert correct state here:
				// check that entity tracking did not change
				expect(el._entity.isCompletionTracked()).to.be.equal(ENABLED);
				expect(el._entity.isProgressDisplayed()).to.be.equal(ENABLED);

				// check that UI state still shows unchecked
				expect(el.shadowRoot.querySelector('#chkCompletionTracked').checked).to.be.false;
				expect(el._trackCompletion).to.be.false;
				expect(el.shadowRoot.querySelector('#chkDisplayProgress').checked).to.be.false;
				expect(el._displayProgress).to.be.false;
			}
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
