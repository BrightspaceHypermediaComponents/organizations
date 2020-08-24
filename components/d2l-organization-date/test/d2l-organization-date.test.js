import '../d2l-organization-date.js';

import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('d2l-organization-date', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-date');
		});
	});

	describe('entities', () => {
		let sandbox,
			component,
			organizationEntity,
			date,
			isActiveStub,
			processedDateStub;

		beforeEach(async() => {
			sandbox = sinon.createSandbox();

			isActiveStub = sinon.stub();
			processedDateStub = sinon.stub();
			date = new Date(Date.parse('1998-01-01T00:00:00.000Z'));

			organizationEntity = {
				isActive: isActiveStub,
				processedDate: processedDateStub
			};
			isActiveStub.returns(false);
			processedDateStub.returns(null);

			component = await fixture(html`<d2l-organization-date></d2l-organization-date>`);
		});

		afterEach(() => {
			sandbox.restore();
		});

		describe('observers', () => {

			it('should call _setOrganizationDate upon changes to OrganizationEntity or hideCourseStartDate and hideCourseEndDate', () => {
				const spy = sandbox.spy(component, '_setOrganizationDate');
				component.hideCourseStartDate = true;
				component.hideCourseEndDate = true;
				component._entity = organizationEntity;

				expect(spy).to.have.been.calledThrice;
			});

			it('should call _sendVoiceReaderInfo upon changes to _statusText', () => {
				const spy = sandbox.spy(component, '_sendVoiceReaderInfo');

				component._statusText = '';
				expect(spy).to.have.been.calledOnce;
			});

		});

		describe('fetching organization', () => {
			beforeEach(done => {
				processedDateStub.returns({
					type: 'startsAt',
					date: date
				});

				component._entity = organizationEntity;
				setTimeout(() => {
					done();
				}, 100);
			});

			it('should set the _statusText', () => {
				expect(component._statusText).to.contain('Starts ');
			});
		});

		describe('Testing attribute default', () => {
			beforeEach(done => {
				setTimeout(() => {
					done();
				}, 100);
			});

			it('should set hideCourseStartDate', () => {
				expect(component.hideCourseStartDate).to.be.false;
			});

			it('should set hideCourseEndDate', () => {
				expect(component.hideCourseEndDate).to.be.false;
			});
		});

		describe('status text', () => {
			it('should display the "Starts" text when date type is startsAt', done => {
				processedDateStub.returns({
					type: 'startsAt',
					date: date
				});
				component._entity = organizationEntity;

				setTimeout(() => {
					const text = component.$$('span:not([hidden])');
					expect(text.innerText).to.contain('Starts ');
					done();
				});

			});

			it('should display the "Ended" text when date type is ended', done => {
				processedDateStub.returns({
					type: 'ended',
					date: date
				});
				component._entity = organizationEntity;

				setTimeout(() => {
					const text = component.$$('span:not([hidden])');
					expect(text.innerText).to.contain('Ended');
					done();
				});

			});

			it('should display the "Ends" text when date type is endsAt', done => {
				processedDateStub.returns({
					type: 'endsAt',
					date: date
				});
				component._entity = organizationEntity;

				setTimeout(() => {
					const text = component.$$('span:not([hidden])');
					expect(text.innerText).to.contain('Ends');
					done();
				});

			});

			it ('should display nothing when processed date is null', done => {
				component._entity = organizationEntity;

				setTimeout(() => {
					const text = component.$$('span:not([hidden])');
					expect(text).to.be.null;
					done();
				});
			});
		});

		describe('Events', () => {

			it('should send the "Starts" text when date type is startsAt', done => {
				component.addEventListener('d2l-organization-accessible', (e) => {
					expect(e.detail.organization.date).to.contain('Starts ');
					done();
				});
				processedDateStub.returns({
					type: 'startsAt',
					date: date
				});
				component._entity = organizationEntity;
			});

			it('should send the "Ends" text when date type is endsAt', done => {
				component.addEventListener('d2l-organization-accessible', (e) => {
					expect(e.detail.organization.date).to.contain('Ends ');
					done();
				});
				processedDateStub.returns({
					type: 'endsAt',
					date: date
				});
				component._entity = organizationEntity;
			});

			it('should send the "Ended" text when date type is ended', done => {
				component.addEventListener('d2l-organization-accessible', (e) => {
					expect(e.detail.organization.date).to.contain('Ended ');
					done();
				});
				processedDateStub.returns({
					type: 'ended',
					date: date
				});
				component._entity = organizationEntity;
			});

		});
	});
});
