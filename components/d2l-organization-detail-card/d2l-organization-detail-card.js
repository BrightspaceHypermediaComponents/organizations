import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { EntityMixin } from 'siren-sdk/src/mixin/entity-mixin.js';
import { OrganizationEntity } from 'siren-sdk/src/organizations/OrganizationEntity.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '../d2l-organization-date/d2l-organization-date.js';
import '../d2l-organization-image/d2l-organization-image.js';
import '../d2l-organization-name/d2l-organization-name.js';
import 'd2l-typography/d2l-typography-shared-styles.js';
import 'd2l-sequences/components/d2l-sequences-module-list.js';
import 'd2l-resize-aware/d2l-resize-aware.js';
import 'd2l-polymer-behaviors/d2l-focusable-behavior.js';
import 'fastdom/fastdom.min.js';

/**
 * @customElement
 * @polymer
 */
class D2lOrganizationDetailCard extends mixinBehaviors([
	D2L.PolymerBehaviors.FocusableBehavior
], EntityMixin(PolymerElement)) {
	constructor() {
		super();
		this._setEntityType(OrganizationEntity);
	}

	static get template() {
		return html`
			<style include="d2l-offscreen-shared-styles"></style>
			<style include="d2l-typography-shared-styles">
				:host {
					background-color: #ffffff;
					border-radius: 8px;
					box-shadow: 0 4px 8px 2px rgba(0, 0, 0, 0.03);
					box-sizing: border-box;
					display: inline-block;
					max-width: 780px;
					overflow: hidden;
					position: relative;
					width: 100%;
					z-index: 0;
				}
				.dedc-container {
					border-radius: 6px;
					display: block;
					height: 100%;
					overflow: hidden;
				}
				.dedc-base-container {
					align-items: stretch;
					display: flex;
					flex-direction: row;
					height: 100%;
					position: relative;
				}
				.dedc-link-text {
					display: inline-block;
					@apply --d2l-offscreen;
				}
				a.d2l-focusable {
					display: block;
					position: absolute;
					height: 100%;
					outline: none;
					width: 100%;
					z-index: 1;
				}
				:host(:dir(rtl)) .dedc-link-text {
					@apply --d2l-offscreen-rtl
				}
				.dedc-description-container {
					margin: 0.1rem 0;
				}
				.dedc-description-container p {
					@apply --d2l-body-small-text;
					color: var(--d2l-color-ferrite);
					height: 3.15rem;
					letter-spacing: 0.4px;
					line-height: 1.5;
					margin: 0;
					overflow: hidden;
					padding: 0;
				}
				.dedc-description-placeholder {
					display: block;
					height: 0.6rem;
					margin: 0.45rem 0;
					width: 95%;
				}
				@keyframes loadingShimmer {
					0% { transform: translate3d(-100%, 0, 0); }
					100% { transform: translate3d(100%, 0, 0); }
				}
				.dedc-image {
					background-color: var(--d2l-color-regolith);
					flex-shrink: 0;
					height: 190px;
					line-height: 0;
					overflow: hidden;
					position: relative;
					width: 220px;
				}
				.dedc-image-shimmer {
					background-color: var(--d2l-color-regolith);
					display: var(--d2l-organization-detail-card-image-shimmer-display, none);
					height: 100%;
					left: 0;
					position: absolute;
					top: 0;
					width: 100%;
					z-index: 1;
				}
				.dedc-image d2l-course-image {
					height: 100%;
					width: 100%;
				}
				.dedc-image-shimmer::after {
					animation: loadingShimmer 1.5s ease-in-out infinite;
					background: linear-gradient(90deg, rgba(249, 250, 251, 0.1), rgba(114, 119, 122, 0.1), rgba(249, 250, 251, 0.1));
					background-color: var(--d2l-color-regolith);
					content: '';
					height: 100%;
					left: 0;
					position: absolute;
					top: 0;
					width: 100%;
				}
				.dedc-base-info-container {
					flex-grow: 1;
					margin: 1.2rem 1rem;
					overflow: hidden;
					position: relative;
					max-height: 142px;
				}
				.dedc-base-info {
					display: flex;
					flex-grow: 1;
					flex-direction: column;
					width: 100%;
				}
				.dedc-base-info-placeholder {
					background-color: #ffffff;
					display: var(--d2l-organization-detail-card-text-placeholder-display, none);
					height: 100%;
					position: absolute;
					width: 100%;
					z-index: 5;
				}
				.dedc-tag-container,
				.dedc-tag-container span d2l-icon {
					@apply --d2l-body-small-text;
					color: var(--d2l-color-ferrite);
					flex-shrink: 0;
				}
				.dedc-tag-container {
					margin: 0.7rem 0px;
					letter-spacing: 0.4px;
					line-height: 0.86;
				}
				.dedc-tag-container span d2l-icon {
					--d2l-icon-width: 18px;
					--d2l-icon-height: 18px;
				}
				.dedc-tag-container span:first-child d2l-icon {
					display: none;
				}
				.dedc-tag-container span {
					white-space: nowrap;
				}
				.dedc-tag-placeholder-container {
					display: flex;
					flex-direction: row;
				}
				.dedc-tag-placeholder {
					height: 0.6rem;
					margin-right: 0.5rem;
					width: 5rem;
				}
				.dedc-text-placeholder {
					background-color: var(--d2l-color-sylvite);
					border-radius: 4px;
				}
				.dedc-title {
					@apply --d2l-body-standard-text;
					color: var(--d2l-color-celestine);
					letter-spacing: 0.4px;
					line-height: 1;
					margin: 0 0 0.1rem 0;
				}
				.dedc-title-placeholder {
					height: 0.85rem;
					margin: 0.075rem 0;
					width: 75%;
				}
				.dedc-module-list {
					display: var(--d2l-organization-detail-card-module-list-display, block);
				}
			</style>
			<!-- focus and hover styles styles here -->
			<style>
				:host([active]),
				:host([active]) .dedc-container {
					overflow: visible;
				}
				:host([active][base-focus]) a.d2l-focusable {
					border-color: rgba(0, 111, 191, 0.4);
					border-radius: 6px;
					box-shadow: 0 0 0 4px rgba(0, 111, 191, 0.3);
				}
				:host([active][base-focus]) .dedc-image {
					border-bottom-left-radius: 6px;
					border-top-left-radius: 6px;
				}
				:host([active][base-focus]) d2l-sequences-module-list {
					border-bottom-left-radius: 6px;
					border-bottom-right-radius: 6px;
					overflow: hidden;
				}
				:host([active][module-list-focus]) .dedc-base-container {
					border-top-left-radius: 6px;
					border-top-right-radius: 6px;
					overflow: hidden;
				}
				:host([active][module-list-focus]) d2l-sequences-module-list {
					position: relative;
					z-index:200;
				}
				.dedc-base-container[has-link]:hover {
					background-color: var(--d2l-color-regolith);
				}
				.dedc-base-container[has-link]:hover .dedc-title {
					text-decoration: underline;
				}
			</style>
			<!-- Mobile styles here -->
			<style>
				.dedc-container[mobile] .dedc-base-container {
					flex-direction: column;
					height: 100%;
				}
				.dedc-container[mobile] .dedc-description-container {
					margin: 0.1rem 0;
				}
				.dedc-container[mobile] .dedc-image {
					height: 100%;
					width: 100%;
				}
				.dedc-container[mobile] .dedc-base-info-container {
					margin: 0.6rem 0.7rem 0.5rem 0.7rem;
				}
				.dedc-container[mobile] .dedc-title {
					font-size: 0.8rem;
					line-height: 1.19;
				}
				.dedc-container[mobile] .dedc-title-placeholder {
					height: 0.7rem;
				}
				.dedc-container[mobile] .dedc-tag-container {
					margin: 0.3rem 0 0.6rem 0;
				}
				.dedc-container[mobile] .dedc-tag-container,
				.dedc-container[mobile] .dedc-description-container p {
					font-size: 0.6rem;
					letter-spacing: 0.4px;
					line-height: 1;
				}
				.dedc-container[mobile] .dedc-tag-placeholder,
				.dedc-container[mobile] .dedc-description-placeholder {
					height: 0.5rem;
				}
				.dedc-container[mobile] .dedc-description-container {
					margin: 0;
				}
				.dedc-container[mobile] .dedc-description-container p {
					line-height: 1.75;
				}
			</style>
			<d2l-resize-aware class="dedc-container" mobile$="[[_mobile]]">
				<div class="dedc-base-container" has-link$="[[_organizationHomepageUrl]]">
					<a class="d2l-focusable" href$="[[_organizationHomepageUrl]]">
						<span class="dedc-link-text">[[_title]]</span>
					</a>
					<div class="dedc-image">
						<div class="dedc-image-shimmer"></div>
						<d2l-organization-image href="[[_organizationUrl]]" token="[[token]]"></d2l-organization-image>
					</div>
					<div  class="dedc-base-info-container">
						<!-- Skeleton for text -->
						<div class="dedc-base-info-placeholder">
							<div class="dedc-base-info">
								<div class="dedc-title dedc-text-placeholder dedc-title-placeholder"></div>
								<div class="dedc-tag-container dedc-tag-placeholder-container">
									<div class="dedc-text-placeholder dedc-tag-placeholder"></div>
									<div class="dedc-text-placeholder dedc-tag-placeholder"></div>
								</div>
								<div class="dedc-description-container">
									<div class="dedc-text-placeholder dedc-description-placeholder"></div>
									<div class="dedc-text-placeholder dedc-description-placeholder"></div>
									<div class="dedc-text-placeholder dedc-description-placeholder"></div>
								</div>
							</div>
						</div>
						<!-- Real text part -->
						<div class="dedc-base-info">
							<h3 class="dedc-title"><d2l-organization-name href="[[_organizationUrl]]"  token="[[token]]"></d2l-organization-name></h3>
							<div class="dedc-tag-container" hidden=[[_showTags]]>
									<span>
										<d2l-icon icon="d2l-tier1:bullet"></d2l-icon>
										<d2l-organization-date href="[[_organizationUrl]]"></d2l-organization-date>
									</span>
							</div>
							<div class="dedc-description-container">
								<p>[[_description]]</p>
							</div>
						</div>
					</div>
				</div>
				<d2l-sequences-module-list class="dedc-module-list" href="[[_sequenceLink]]" token="[[token]]"></d2l-sequences-module-list>
			</d2l-resize-aware>
		`;
	}

	static get properties() {
		return {
			baseFocus: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			moduleListFocus: {
				type: Boolean,
				value: false,
				reflectToAttribute: true
			},
			active: {
				type: Boolean,
				computed: '_computeActive(moduleListFocus, baseFocus)',
				reflectToAttribute: true
			},
			_description: String,
			_image: String,
			_organizationUrl: String,
			_sequenceLink: String,
			_showTags: {
				type: Boolean,
				value: false
			},
			_tags: String,
			_title: String,
			_mobile: {
				type: Boolean,
				value: false
			},
			_organizationHomepageUrl: String,
			_ariaText: String
		};
	}
	static get observers() {
		return [
			'_onOrganizationChange(_entity)'
		];
	}
	connectedCallback() {
		super.connectedCallback();
		afterNextRender(this, () => {
			const resizeAware = this.shadowRoot.querySelector('d2l-resize-aware');
			resizeAware.addEventListener('d2l-resize-aware-resized', this._onResize.bind(this));
			resizeAware._onResize();

			const link = this.shadowRoot.querySelector('a');
			link.addEventListener('blur', this._onLinkBlurBase.bind(this));
			link.addEventListener('focus', this._onLinkFocusBase.bind(this));

			const moduleList = this.shadowRoot.querySelector('.dedc-module-list');
			moduleList.addEventListener('blur', this._onLinkBlurModuleList.bind(this));
			moduleList.addEventListener('focus', this._onLinkFocusModuleList.bind(this));
		});
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		const resizeAware = this.shadowRoot.querySelector('d2l-resize-aware');
		resizeAware.removeEventListener('d2l-resize-aware-resized', this._onResize.bind(this));

		const link = this.shadowRoot.querySelector('a');
		link.removeEventListener('blur', this._onLinkBlurBase.bind(this));
		link.removeEventListener('focus', this._onLinkFocusBase.bind(this));

		const moduleList = this.shadowRoot.querySelector('.dedc-module-list');
		moduleList.removeEventListener('blur', this._onLinkBlurModuleList.bind(this));
		moduleList.removeEventListener('focus', this._onLinkFocusModuleList.bind(this));
	}
	_computeActive(base, moduleList) {
		return base || moduleList;
	}
	_onLinkBlurBase() {
		this.baseFocus = false;
	}
	_onLinkFocusBase() {
		this.baseFocus = true;
	}
	_onLinkFocusModuleList() {
		this.moduleListFocus = true;
	}
	_onLinkBlurModuleList() {
		this.moduleListFocus = false;
	}
	_onOrganizationChange(organization) {
		this._organizationUrl = organization.self();
		this._description = organization.description();
		this._sequenceLink = organization.sequenceLink();
		this._organizationHomepageUrl = organization.organizationHomepageUrl();
		this._showTags = organization.startDate() || organization.endDate();
	}
	_onResize(e) {
		this._mobile = e.detail.current.width <= 389;
	}
}

window.customElements.define('d2l-organization-detail-card', D2lOrganizationDetailCard);

// Make shared style so it is easy to mass hide loading.
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `
<custom-style>
	<style is="custom-style">
		html {

			--d2l-organization-detail-card-loading: {
				--d2l-organization-detail-card-image-shimmer-display: block;
				--d2l-organization-detail-card-module-list-display: none;
				--d2l-organization-detail-card-text-placeholder-display: block;
			};

			--d2l-organization-detail-card-loading-text: {
				--d2l-organization-detail-card-module-list-display: none;
				--d2l-organization-detail-card-text-placeholder-display: block;
			};

			--d2l-organization-detail-card-loading-image: {
				--d2l-organization-detail-card-image-shimmer-display: block;
			};

		}
	</style>
</custom-style>`;

document.head.appendChild($_documentContainer.content);
