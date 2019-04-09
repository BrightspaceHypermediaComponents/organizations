describe('d2l-organization-name', () => {
	var sandbox,
		component,
		organizationEntity;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('org-name');

		organizationEntity = {
			name: function() { return 'Test Course Name'; }
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
			component._onOrganizationChange(organizationEntity);
			expect(component._organizationName).to.equal('Test Course Name');
		});

	});

});
