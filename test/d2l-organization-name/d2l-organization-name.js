describe('d2l-organization-name', () => {
	var sandbox,
		component,
		organizationEntity;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('no-params');

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
			}]
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('observers', () => {
		it('should call _sendVoiceReaderInfo upon changes to _organizationName', () => {
			var spy = sandbox.spy(component, '_sendVoiceReaderInfo');

			component.set('_organizationName', 'Course Name');
			expect(spy).to.have.been.calledOnce;
		});

	});

	describe('fetching organization', () => {
		it('should set the _organizationName', () => {
			component._loadData(organizationEntity);
			expect(component._organizationName).to.equal('Course Name');
		});

	});

});
