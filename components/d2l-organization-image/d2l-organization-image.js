import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import {afterNextRender} from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-course-image/d2l-course-image.js';
import { Classes } from 'd2l-hypermedia-constants';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';

/**
 * @customElement
 * @polymer
 */
class D2lOrganizationImage extends mixinBehaviors([ D2L.PolymerBehaviors.Siren.EntityBehavior ], PolymerElement) {
	static get template() {
		return html`
			<d2l-course-image image="[[_image]]" sizes="[[tileSizes]]" type="[[type]]"></d2l-course-image>
		`;
	}

	static get properties() {
		return {
			tileSizes: {
				type: Object,
				value: function() {
					return {
						mobile: {
							maxwidth: 767,
							size: 100
						},
						tablet: {
							maxwidth: 1243,
							size: 67
						},
						desktop: {
							size: 25
						}
					};
				}
			},
			type: {
				type: String,
				value: 'tile'
			},
			_image: String
		};
	}
	static get observers() {
		return [
			'_handleOrganizationResponse(entity)'
		];
	}

	attached() {
		super.attached();
		afterNextRender(this, () => {
			const image = this.shadowRoot.querySelector('d2l-course-image');
			image.addEventListener('course-image-loaded', this._imageLoaded.bind(this));
		});
	}

	detached() {
		const image = this.shadowRoot.querySelector('d2l-course-image');
		image.removeEventListener('course-image-loaded', this._imageLoaded.bind(this));
	}

	_handleOrganizationResponse(organization) {
		if (!organization) {
			return;
		}

		if (organization.hasSubEntityByClass(Classes.courseImage.courseImage)) {
			const imageEntity = organization.getSubEntityByClass(Classes.courseImage.courseImage);
			if (imageEntity.href) {
				if (imageEntity.href !== this._imageEntityUrl || (typeof this.token !== 'string' && typeof this.token !== 'function')) {
					window.D2L.Siren.EntityStore.removeListener(imageEntity.href, this.token, this._handleImageResponse.bind(this));
				}
				this._imageEntityUrl = imageEntity.href;
				window.D2L.Siren.EntityStore.addListener(imageEntity.href, this.token, this._handleImageResponse.bind(this));
				window.D2L.Siren.EntityStore.fetch(imageEntity.href, this.token);
			} else {
				this._image = imageEntity;
			}
		}
	}

	_imageLoaded() {
		this.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
			bubbles: true,
			composed: true
		}));
	}

	_handleImageResponse(hydratedImageEntity) {
		this._image = hydratedImageEntity;
	}
}

window.customElements.define('d2l-organization-image', D2lOrganizationImage);
