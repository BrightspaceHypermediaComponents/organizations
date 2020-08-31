import '../../components/d2l-organization-name/d2l-organization-name.js';

import { expect, fixture, html } from '@open-wc/testing';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('d2l-organization-name', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-name');
		});
	});

	let sandbox,
		component,
		organizationEntity;

	beforeEach(async() => {
		sandbox = sinon.createSandbox();

		component = await fixture(html`<d2l-organization-name></d2l-organization-name>`);

		organizationEntity = {
			name: () => 'Test Course Name'
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('observers', () => {
		it('should call _sendVoiceReaderInfo upon changes to _organizationName', done => {
			const spy = sandbox.spy(component, '_sendVoiceReaderInfo');

			component.set('_organizationName', 'Course Name');
			afterNextRender(component, () => {
				expect(spy).to.have.been.calledOnce;
				done();
			});
		});

	});

	describe('fetching organization', () => {
		it('should set the _organizationName', done => {
			component._onOrganizationChange(organizationEntity);
			afterNextRender(component, () => {
				expect(component._organizationName).to.equal('Test Course Name');
				done();
			});
		});

	});

});
