'use strict';

import { Entity } from 'siren-sdk/es6/Entity.js';
import { Rels } from 'd2l-hypermedia-constants';

export class OrganizationEntity extends Entity {
	// Entity has a constructor that is called from the factory to keep track of what is required to be cleaned.
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
	code() {
		return this._entity && this._entity.properties && this._entity.properties.code;
	}
	semesterHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.parentSemester)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.parentSemester).href;
	}

	endDate() {
		return this._entity && this._entity.properties && this._entity.properties.endDate;
	}

	startDate() {
		return this._entity && this._entity.properties && this._entity.properties.startDate;
	}

	isActive() {
		return this._entity && this._entity.properties && this._entity.properties.isActive;
	}

	onSemesterChange(onChange) {
		const semesterHref = this.semesterHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
		semesterHref && this._subEntity(OrganizationEntity, semesterHref, onChange);
	}
}
