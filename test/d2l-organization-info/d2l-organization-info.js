describe('d2l-organization-info', () => {
	var sandbox,
		component,
		organizationEntity;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('org-info');

		organizationEntity = {
			properties: {
				name: 'Course Name',
				code: 'SCI100'
			},
			hasLinkByRel: function() { return true; },
			getLinkByRel: function() { return { href: 'fake.json' }; }
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('fetching organization', () => {
		it('should set the _organizationCode and _semesterHref', () => {
			component.showSemesterName = true;
			component.entity = organizationEntity;
			expect(component._organizationCode).to.equal('SCI100');
			expect(component._semesterHref).to.equal('fake.json');
		});

		it('should not set _semesterHref when showSemesterName is false', () => {
			component.entity = organizationEntity;
			expect(component._organizationCode).to.equal('SCI100');
			expect(component._semesterHref).to.equal(undefined);
		});
	});

	describe('Set semesterHref', () => {
		it('should set _semesterHref', () => {
			component.entity = organizationEntity;
			component.showSemesterName = true;
			expect(component._semesterHref).to.equal('fake.json');
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
			component.entity = organizationEntity;
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
