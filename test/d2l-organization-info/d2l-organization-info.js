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
				code: 'SCI100',
				startDate: null,
				endDate: null,
				isActive: false
			},
			links: [{
				rel: ['https://api.brightspace.com/rels/parent-semester'],
				href: '/semester.json'
			}],
			hasLinkByRel: function() { return true; },
			getLinkByRel: function() { return '/semester.json'; }
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('fetching organization', () => {
		it('should set the _organizationCode', () => {
			component.entity = organizationEntity;
			expect(component._organizationCode).to.equal('SCI100');
		});
	});

	describe('Events', () => {
		it('d2l-organization-accessible should have semesterName and course code.', done => {
			sinon.spy(component, 'fire');
			component.entity = organizationEntity;
			component.showOrganizationCode = true;
			component.showSemesterName = true;
			component._semesterName = 'Course Name';
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
