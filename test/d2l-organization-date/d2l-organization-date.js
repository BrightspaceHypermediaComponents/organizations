window.D2L.Siren.WhitelistBehavior._testMode(true);
describe('d2l-organization-date', () => {
	var sandbox,
		component,
		organizationEntity,
		date,
		isActiveStub,
		processedDateStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		isActiveStub = sinon.stub();
		processedDateStub = sinon.stub();
		date = new Date(Date.parse('1998-01-01T00:00:00.000Z'));

		organizationEntity = {
			isActive: isActiveStub,
			processedDate: processedDateStub
		};
		isActiveStub.returns(false);
		processedDateStub.returns(null);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('observers', () => {
		beforeEach(() => {
			component = fixture('org-date');
		});

		it('should call _setOrganizationDate upon changes to OrganizationEntity or hideCourseStartDate and hideCourseEndDate', () => {
			var spy = sandbox.spy(component, '_setOrganizationDate');
			component.hideCourseStartDate = true;
			component.hideCourseEndDate = true;
			component._entity = organizationEntity;

			expect(spy).to.have.been.calledThrice;
		});

		it('should call _sendVoiceReaderInfo upon changes to _statusText', () => {
			var spy = sandbox.spy(component, '_sendVoiceReaderInfo');

			component._statusText = '';
			expect(spy).to.have.been.calledOnce;
		});

	});

	describe('fetching organization', () => {
		beforeEach(done => {
			component = fixture('org-date');
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
			component = fixture('org-date');
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
			component = fixture('org-date');
			processedDateStub.returns({
				type: 'startsAt',
				date: date
			});
			component._entity = organizationEntity;

			setTimeout(() => {
				var text = component.$$('span:not([hidden])');
				expect(text.innerText).to.contain('Starts ');
				done();
			});

		});

		it('should display the "Ended" text when date type is ended', done => {
			component = fixture('org-date');
			processedDateStub.returns({
				type: 'ended',
				date: date
			});
			component._entity = organizationEntity;

			setTimeout(() => {
				var text = component.$$('span:not([hidden])');
				expect(text.innerText).to.contain('Ended');
				done();
			});

		});

		it('should display the "Ends" text when date type is endsAt', done => {
			component = fixture('org-date');
			processedDateStub.returns({
				type: 'endsAt',
				date: date
			});
			component._entity = organizationEntity;

			setTimeout(() => {
				var text = component.$$('span:not([hidden])');
				expect(text.innerText).to.contain('Ends');
				done();
			});

		});

		it ('should display nothing when processed date is null', done => {
			component = fixture('org-date');
			component._entity = organizationEntity;

			setTimeout(() => {
				var text = component.$$('span:not([hidden])');
				expect(text).to.be.null;
				done();
			});
		});
	});

	describe('Events', () => {
		beforeEach(async() => {
			component = await fixture('org-date');
		});

		it('should send event with detail of inactive as true', done => {
			component.addEventListener('d2l-organization-date', function(e) {
				expect(e.detail.active).to.be.true;
				done();
			});

			processedDateStub.returns({
				type: 'startsAt',
				date: date
			});
			isActiveStub.returns(true);
			component._entity = organizationEntity;
		});

		it('should send event with detail of beforeStartDate as true.', done => {
			component.addEventListener('d2l-organization-date', function(e) {
				expect(e.detail.beforeStartDate).to.be.true;
				done();
			});

			processedDateStub.returns({
				type: 'startsAt',
				date: date,
				beforeStartDate: true
			});
			component._entity = organizationEntity;
		});

		it('should send event with detail of afterEndDate as true.', done => {
			component.addEventListener('d2l-organization-date', function(e) {
				expect(e.detail.afterEndDate).to.be.true;
				done();
			});

			processedDateStub.returns({
				type: 'startsAt',
				date: date,
				afterEndDate: true
			});
			component._entity = organizationEntity;
		});

		it('should send the "Starts" text when date type is startsAt', done => {
			component.addEventListener('d2l-organization-accessible', function(e) {
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
			component.addEventListener('d2l-organization-accessible', function(e) {
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
			component.addEventListener('d2l-organization-accessible', function(e) {
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
