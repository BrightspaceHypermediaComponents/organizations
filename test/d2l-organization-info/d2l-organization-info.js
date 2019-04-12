describe('d2l-organization-info', () => {
	var sandbox,
		component,
		organizationEntity,
		semesterEntity,
		onSemesterChangeStub;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('org-info');
		onSemesterChangeStub = sinon.stub();

		organizationEntity = {
			name: function() { return 'Org Name'; },
			code: function() { return 'SCI100'; },
			onSemesterChange: onSemesterChangeStub
		};

		semesterEntity = {
			name: function() { return 'Course Name'; },
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
			expect(component._semesterName).to.equal(undefined);
		});

		it('should set _semesterName when showSemesterName is true', () => {
			component._entity = organizationEntity;
			component.showSemesterName = true;

			expect(onSemesterChangeStub).to.have.been.calledOnce;
			expect(component._semesterName).to.equal(semesterEntity.name());
		});
	});

	describe('Show separator', () => {
		it('should show separator when both semester name and semester code are showing', () => {
			var showSeparator = component._computeShowSeparator(true, true);
			expect(showSeparator).to.be.true;
		});

		it('should not show separator when only semester name is showing', () => {
			var showSeparator = component._computeShowSeparator(false, true);
			expect(showSeparator).to.be.false;
		});

		it('should not show separator when only semester code is showing', () => {
			var showSeparator = component._computeShowSeparator(true, false);
			expect(showSeparator).to.be.false;
		});

		it('should not show separator when neither semester name nor semester code are showing', () => {
			var showSeparator = component._computeShowSeparator(false, false);
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
