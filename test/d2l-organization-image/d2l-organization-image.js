import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { sequenceRoot } from './learning-path-sequence-root.js';

window.D2L.Siren.WhitelistBehavior._inTestMode = true;

describe('d2l-organization-image', () => {
	var sandbox,
		component;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		var organization1Entity = {
			class: [ 'course-offering' ],
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
				href:'/image/1'
			}],
			links: [{
				rel:['self'],
				href:'/organizations/1'
			}]
		};
		var organization2Entity = {
			class: [ 'course-offering' ],
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
				href:'/image/2'
			}],
			links: [{
				rel:['self'],
				href:'/organizations/2'
			}]
		};
		var organization3Entity = {
			class: [ 'course-offering' ],
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
				href:'/image/3'
			}],
			links: [{
				rel:['self'],
				href:'/organizations/3'
			}]
		};

		var learningPathEntity = {
			class: [ 'learning-path' ],
			properties: {
				name: 'LearningPath',
				code: 'SCI100',
				startDate: null,
				endDate: null,
				isActive: false
			},
			links: [{
				rel:['self'],
				href:'/learningPaths/1'
			}, {
				href: '/sequenceRoot',
				rel: ['https://api.brightspace.com/rels/sequence']
			}]
		};

		const image1Entity = {
			rel: ['https://api.brightspace.com/rels/organization-image'],
			class: ['course-image'],
			properties: {
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

		const image2Entity = {
			rel: ['https://api.brightspace.com/rels/organization-image'],
			class: ['course-image'],
			properties: {
				name: '2.jpg',
				type: 'image/jpeg'
			},
			links: [{
				rel: ['self'],
				href: '/image/2'
			}, {
				rel: ['alternate'],
				class: ['tile', 'low-density', 'max'],
				href: 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
			}]
		};

		const image3Entity = {
			rel: ['https://api.brightspace.com/rels/organization-image'],
			class: ['course-image'],
			properties: {
				name: '3.jpg',
				type: 'image/jpeg'
			},
			links: [{
				rel: ['self'],
				href: '/image/3'
			}, {
				rel: ['alternate'],
				class: ['tile', 'low-density', 'max'],
				href: 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
			}]
		};

		sandbox.stub(window.d2lfetch, 'fetch', (input) => {
			const whatToFetch = {
				'/organizations/1': organization1Entity,
				'/organizations/2': organization2Entity,
				'/organizations/3': organization3Entity,
				'/learningPaths/1': learningPathEntity,
				'/image/1': image1Entity,
				'/image/2': image2Entity,
				'/image/3': image3Entity,
				'/sequenceRoot': sequenceRoot
			};
			return Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(whatToFetch[input]); }
			});
		});
	});

	afterEach(() => {
		sandbox.restore();
	});

	it('loads element', () => {
		component = fixture('no-params');
		expect(component).to.exist;
	});
	describe('Loading the image', () => {
		it('should set the image entity', done => {
			component = fixture('with-href');
			afterNextRender(component, () => {
				expect(component.href).to.equal('/organizations/1');
				expect(component._primaryImage.properties.name).to.equal('1.jpg');
				expect(component._secondaryImage).to.be.null;
				expect(component._tertiaryImage).to.be.null;
				done();
			});
		});

		it('should set all image entity for learning paths', done => {
			component = fixture('with-learning-paths');
			afterNextRender(component, () => {
				expect(component.href).to.equal('/learningPaths/1');
				expect(component._primaryImage.properties.name).to.equal('1.jpg');
				expect(component._secondaryImage.properties.name).to.equal('2.jpg');
				expect(component._tertiaryImage.properties.name).to.equal('3.jpg');
				done();
			});
		});

	});

});
