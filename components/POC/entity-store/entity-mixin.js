'use strict';
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { entityFactory, decompose } from 'Entity.js';

/* @polymerMixin */
export const interalEntityMixin = function(superClass) {
	return class extends superClass {
		static get properties() {
			return {
				href: {
					type: String,
					reflectToAttribute: true
				},
				token: String,
				entity: Object
			};
		}

		static get observers() {
			return [
				'__onHrefChange(href, token)'
			];
		}

		detached() {
			decompose(this._entity);
		}

		_setEntityType(entityType) {
			if (typeof entityType === 'object') {
				this._entityType = entityType;
			}
		}

		__onHrefChange(href, token) {
			if (typeof this._entityType === 'object') {
				entityFactory(this._entityType, href, token, entity => {
					this._entity = entity;
				});
			}
		}

	};
};

export const EntityMixin = dedupingMixin(interalEntityMixin);
