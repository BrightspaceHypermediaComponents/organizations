import '../../components/d2l-organization-image/d2l-organization-image.js';

import { expect, fixture, html } from '@open-wc/testing';
import {
	image1Entity,
	image2Entity,
	image3Entity,
	learningPathEntity,
	organization1Entity,
	organization2Entity,
	organization3Entity,
	sequenceRoot
} from './data.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('d2l-organization-image', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-image');
		});
	});

	describe('entities', () => {
		let sandbox,
			component;

		beforeEach(() => {
			sandbox = sinon.createSandbox();

			sandbox.stub(window.d2lfetch, 'fetch').callsFake((input) => {
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

		it('loads element', async() => {
			component = await fixture(html`<d2l-organization-image></d2l-organization-image>`);
			expect(component).to.exist;
		});

		describe('Loading the image', () => {
			it('should set the image entity', (done) => {
				(async() => {
					component = await fixture(html`
						<d2l-organization-image href="/organizations/1" token="whatever"></d2l-organization-image>
					`);
					afterNextRender(component, () => {
						expect(component.href).to.equal('/organizations/1');
						expect(component._primaryImage.properties.name).to.equal('1.jpg');
						expect(component._secondaryImage).to.be.null;
						expect(component._tertiaryImage).to.be.null;
						done();
					});
				})();
			});

			it('should set all image entity for learning paths', (done) => {
				(async() => {
					component = await fixture(html`
						<d2l-organization-image href="/learningPaths/1" token="whatever2"></d2l-organization-image>
					`);
					afterNextRender(component, () => {
						expect(component.href).to.equal('/learningPaths/1');
						expect(component._primaryImage.properties.name).to.equal('1.jpg');
						expect(component._secondaryImage.properties.name).to.equal('2.jpg');
						expect(component._tertiaryImage.properties.name).to.equal('3.jpg');
						done();
					});
				})();
			});

		});
	});
});
