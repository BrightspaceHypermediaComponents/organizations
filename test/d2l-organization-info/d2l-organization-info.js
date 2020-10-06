import '../../components/d2l-organization-info/d2l-organization-info.js';

import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('d2l-organization-info', () => {
	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-info');
		});
	});

	let sandbox,
		component,
		organizationEntity,
		semesterEntity,
		onSemesterChangeStub;

	beforeEach(async() => {
		sandbox = sinon.createSandbox();

		component = await fixture(html`<d2l-organization-info></d2l-organization-info>`);
		onSemesterChangeStub = sinon.stub();

		organizationEntity = {
			name: () => 'Org Name',
			code: () => 'SCI100',
			onSemesterChange: onSemesterChangeStub
		};

		semesterEntity = {
			name: () => 'Course Name',
		};

		onSemesterChangeStub.callsArgWith(0, semesterEntity);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('fetching organization', () => {
		it('should set the _organizationCode', () => {
			component.showSemesterName = true;
			component._entity = organizationEntity;
			expect(component._organizationCode).to.equal('SCI100');
		});

		it('should not set _semesterName when showSemesterName is false', () => {
			component._entity = organizationEntity;
			expect(onSemesterChangeStub).to.have.not.been.called;
			expect(component._semesterName).to.equal(null);
		});

		it('should set _semesterName when showSemesterName is true', () => {
			component._entity = organizationEntity;
			component.showSemesterName = true;

			expect(onSemesterChangeStub).to.have.been.calledOnce;
			expect(component._semesterName).to.equal(semesterEntity.name());
		});

		it('should reset _semesterName in case showSemesterName changes', () => {
			component._entity = organizationEntity;
			component.showSemesterName = true;

			expect(component._semesterName).to.equal(semesterEntity.name());

			component.showSemesterName = false;

			expect(component._semesterName).to.be.null;
			expect(onSemesterChangeStub).to.have.been.calledOnce;
		});

		it('should reset _semesterName in case the new org does not have a semester', () => {
			component._entity = organizationEntity;
			component.showSemesterName = true;

			expect(component._semesterName).to.equal(semesterEntity.name());

			component._entity = {
				name: () => 'New Org Name',
				code: () => 'NEW100',
				onSemesterChange: () => {}
			};

			expect(component._semesterName).to.be.null;
			expect(onSemesterChangeStub).to.have.been.calledOnce;
		});
	});

	describe('Show separator', () => {
		it('should show separator when both semester name and semester code are showing', () => {
			const showSeparator = component._computeShowSeparator(true, true, 'code', 'name');
			expect(showSeparator).to.be.true;
		});

		it('should not show separator when both semester name and semester code are showing but one of their length is 0', () => {
			const showSeparator = component._computeShowSeparator(true, true, 'code');
			expect(showSeparator).to.be.undefined;
		});

		it('should not show separator when only semester name is showing', () => {
			const showSeparator = component._computeShowSeparator(false, true, 'code', 'name');
			expect(showSeparator).to.be.false;
		});

		it('should not show separator when only semester code is showing', () => {
			const showSeparator = component._computeShowSeparator(true, false, 'code', 'name');
			expect(showSeparator).to.be.false;
		});

		it('should not show separator when neither semester name nor semester code are showing', () => {
			const showSeparator = component._computeShowSeparator(false, false, 'code', 'name');
			expect(showSeparator).to.be.false;
		});
	});

	describe('Events', () => {
		it('d2l-organization-accessible should have semesterName and course code.', done => {
			sinon.spy(component, 'fire');
			component.showOrganizationCode = true;
			component.showSemesterName = true;
			component._semesterName = 'Course Name';
			component._entity = organizationEntity;
			expect(component.fire).to.have.been.calledWith('d2l-organization-accessible', {
				organization: {
					code: 'SCI100'
				},
				semesterName: 'Course Name'
			});
			done();
		});
	});

});
