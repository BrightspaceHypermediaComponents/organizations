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
			expect(component._semesterHref).to.equal(null);
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
