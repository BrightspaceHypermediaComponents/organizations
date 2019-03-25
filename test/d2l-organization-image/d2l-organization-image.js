describe('d2l-organization-image', () => {
	var sandbox,
		component,
		fetchStub,
		imageEntity;

	function SetupFetchStub(url, entity) {
		fetchStub.withArgs(sinon.match.has('url', sinon.match(url)))
			.returns(Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(entity); }
			}));
	}

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		var organizationEntity = {
			properties: {
				name: 'Course Name',
				code: 'SCI100',
				startDate: null,
				endDate: null,
				isActive: false
			},
			entities:[{
				class:['course-image'],
				rel:['https://api.brightspace.com/rels/organization-image'],
				href:'image/1'
			}]
		};

		const imageEntity = {
			rel: ['https://api.brightspace.com/rels/organization-image'],
			class: ['course-image'],
			propeties: {
				name: '1.jpg',
				type: 'image/jpeg'
			},
			links: [{
				rel: ['self'],
				href: '/image/1'
			}, {
				rel: ['alternate'],
				class: ['tile', 'low-density', 'max'],
				href: 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
			}]
		};

		fetchStub = sandbox.stub(window.d2lfetch, 'fetch');
		SetupFetchStub(/\/organizations\/1$/, organizationEntity);
		SetupFetchStub(/\/image\/1$/, imageEntity);
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('loads element', () => {
		component = fixture('no-params');
		expect(component).to.exist;
	});
	describe('Loading the image', () => {
		it('should set the image entity', () => {
			component = fixture('with-href');
			expect(component._image).to.equal(imageEntity);
		});

	});

});
