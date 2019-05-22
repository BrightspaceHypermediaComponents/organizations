import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { OrganizationEntity } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-course-image/d2l-course-image.js';

/**
 * @customElement
 * @polymer
 */
class D2lOrganizationImage extends EntityMixin(PolymerElement) {
	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

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
			'_onOrganizationChange(_entity)'
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

	_onOrganizationChange(organization) {
		const imageEntity = organization.imageEntity();
		if (!imageEntity) {
			return;
		}

		if (imageEntity.href) {
			this._entity.onImageChange((image) => {
				this._image = image.entity();
			});
		} else {
			this._image = imageEntity;
		}
	}

	_imageLoaded() {
		this.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
			bubbles: true,
			composed: true
		}));
	}
}

window.customElements.define('d2l-organization-image', D2lOrganizationImage);
