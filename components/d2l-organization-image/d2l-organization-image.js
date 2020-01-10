import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { OrganizationEntity, classes as organizationClasses } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import 'd2l-course-image/d2l-course-image.js';

/**
 * @customElement
 * @polymer
 */
class D2lOrganizationImage extends EntityMixin(PolymerElement) {

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
			_primaryImage: String,
			_secondaryImage: String,
			_tertiaryImage: String,
			_noImage: {
				type: Boolean,
				value: false
			}
		};
	}

	static get observers() {
		return [
			'_onOrganizationChange(_entity)'
		];
	}

	static get template() {
		return html`
			<style>
				:host {
					display: block;
					position: relative;
					height: 100%;
					width: 100%;
				}
				:host([hidden]) {
					display: none;
				}
				:host d2l-course-image {
					display: flex;
					height: 100%;
					width: 100%;
				}
				.doi-flex {
					position: absolute;
					top: 0;
					left: 0;
					display: flex;
					height: 100%;
					width: 100%;
				}
				.doi-flex-inner {
					display: flex;
					flex-direction: column;
					flex-basis: 33%;
					border-left: white solid 1px;
				}
				:host([dir="rtl"]) .doi-flex-inner {
					border-left: white solid 0px;
					border-right: white solid 1px;
				}
				.doi-flex-inner[hidden] {
					display: none;
					margin-left: 0;
				}
				.doi-primary {
					flex-basis: 66%;
					flex-grow: 1;
				}
				.doi-secondary {
					flex-grow: 1;
					flex-basis: 50%;
				}
				.doi-tertiary {
					border-top: white solid 1px;
					flex-grow: 1;
					flex-shrink: 0;
					flex-basis: 50%;
				}
				.doi-tertiary[hidden] {
					display: none;
				}
				.doi-no-image {
					width: 100%;
					height: 100%;
					max-height: inherit;
					max-width: inherit;
				}
				.doi-no-image rect {
					fill: var(--d2l-color-regolith);
					stroke: var(--d2l-color-corundum);
					stroke-width: 0.1rem;
					stroke-dasharray: 0.25rem;
					stroke-dashoffset: 0.125rem;
				}
			</style>
			<template is="dom-if" if="[[_noImage]]">
				<svg class="doi-no-image">
					<rect x="0" y="0" width="100%" height="100%"></rect>
				</svg>
			</template>
			<d2l-course-image image="[[_primaryImage]]" sizes="[[tileSizes]]" type="[[type]]" hidden$=[[_noImage]]></d2l-course-image>
			<div class="doi-flex" hidden$=[[_noImage]]>
				<div class="doi-primary"></div>
				<div class="doi-flex-inner" hidden$=[[!_secondaryImage]]>
					<d2l-course-image class="doi-secondary" image="[[_secondaryImage]]" sizes="[[tileSizes]]" type="[[type]]"></d2l-course-image>
					<d2l-course-image class="doi-tertiary" hidden$="[[!_tertiaryImage]]" image="[[_tertiaryImage]]" sizes="[[tileSizes]]" type="[[type]]"></d2l-course-image>
				</div>
			</div>
		`;
	}

	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
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
		if (organization.hasClass(organizationClasses.courseOffering)) {
			this._entity.onImageChange((image) => {
				this._primaryImage = image.entity();
				this._secondaryImage = null;
				this._tertiaryImage = null;
			});
		} else if (organization.hasClass(organizationClasses.learningPath)) {
			organization.onSequenceChange(this._onRootSequenceChange.bind(this));
		}

		organization.subEntitiesLoaded().then(() => {
			if (!this._primaryImage) {
				this._noImage = true;
				this._imageLoaded();
			}
		});
	}

	_onRootSequenceChange(rootSequence) {
		const images = [];

		rootSequence.onSubSequencesChange((subSequence) => {
			images[subSequence.index()] = [];

			subSequence.onSequencedActivityChange((sequencedActivity) => {
				images[subSequence.index()][sequencedActivity.index()] = null;

				sequencedActivity.onOrganizationChange((organizationEntity) => {
					if (organizationEntity.hasClass(organizationClasses.courseOffering)) {
						organizationEntity.onImageChange((image) => {
							images[subSequence.index()][sequencedActivity.index()] = image.entity();

							const filterImages = this._flattenDeep(images).filter(element => element);
							this._primaryImage = filterImages[0] || null;
							this._secondaryImage = filterImages[1] || null;
							this._tertiaryImage = filterImages[2] || null;
						});
					}
				});

			});
		});
	}

	_imageLoaded() {
		this.dispatchEvent(new CustomEvent('d2l-organization-image-loaded', {
			bubbles: true,
			composed: true
		}));
	}

	getTileSizes() {
		const image = this.shadowRoot.querySelector('d2l-course-image');
		return image.getTileSizes();
	}

	// Couldn't use flat so I stole it from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
	_flattenDeep(arr1) {
		return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(this._flattenDeep(val)) : acc.concat(val), []);
	}
}

window.customElements.define('d2l-organization-image', D2lOrganizationImage);
