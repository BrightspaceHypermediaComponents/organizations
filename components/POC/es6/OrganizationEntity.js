'use strict';

import { Entity } from '../entity-store/entity.js';
import { Rels } from 'd2l-hypermedia-constants';

export class OrganizationEntity extends Entity {
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

	onSemesterChange(onChange) {
		const semesterHref = this.semesterHref();
		semesterHref && this._subEntity(OrganizationEntity, semesterHref, this._token, onChange);
	}
}
