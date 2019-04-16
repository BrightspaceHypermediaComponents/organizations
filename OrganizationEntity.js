'use strict';

import { Entity } from 'siren-sdk/es6/Entity.js';
import { SimpleEntity } from 'siren-sdk/es6/SimpleEntity.js';
import { Rels, Classes } from 'd2l-hypermedia-constants';

export const classes = {
	course: 'course',
	active: 'active',
	inactive: 'inactive'
};

export class OrganizationEntity extends Entity {
	// Entity has a constructor that is called from the factory to keep track of what is required to be cleaned.
	name() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}

	code() {
		return this._entity && this._entity.properties && this._entity.properties.code;
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

	description() {
		let description = this._entity && this._entity.properties && this.properties.description;
		if (description) {
			description = description.replace(/<[^>]*>/g, '');
		}
		return description;
	}

	sequenceLink() {
		return this._entity && this._entity.hasLinkByRel('https://api.brightspace.com/rels/sequence') &&
		this._entity.getLinkByRel('https://api.brightspace.com/rels/sequence').href;
	}

	organizationHomepageUrl() {
		if (!this._entity || !this._entity.hasSubEntityByRel(Rels.organizationHomepage)) {
			return null;
		}

		var homepageEntity = this._entity.getSubEntityByRel(Rels.organizationHomepage);
		return homepageEntity
			&& homepageEntity.properties
			&& homepageEntity.properties.path;
	}

	imageEntity() {
		return this._entity && this._entity.getSubEntityByClass(Classes.courseImage.courseImage);
	}

	onSemesterChange(onChange) {
		const semesterHref = this._semesterHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
		semesterHref && this._subEntity(OrganizationEntity, semesterHref, onChange);
	}

	onImageChange(onChange) {
		const image = this.imageEntity();
		const imageHref = image && image.href;
		imageHref && this._subEntity(SimpleEntity, imageHref, onChange);
	}

	_semesterHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.parentSemester)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.parentSemester).href;
	}
}
