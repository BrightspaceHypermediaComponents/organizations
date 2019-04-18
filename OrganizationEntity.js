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

	onNotificationsChange(onChange) {
		const notificationsHref = this._notificationCollectionHref();
		notificationsHref && this._subEntity(NotificationCollectionEntity, notificationsHref, onChange);
	}

	_semesterHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.parentSemester)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.parentSemester).href;
	}

	_notificationCollectionHref() {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.Notifications)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Notifications).href;
	}
}

class NotificationCollectionEntity extends Entity {

	getNotifications() {
		var notificationEntityList = [];
		const notificationCollectionEntity = this._notificationCollectionEntity();
		for (var i = 0; i < this._size(); i++) {
			notificationEntityList.push(new NotificationEntity(notificationCollectionEntity[i]));
		}
		return notificationEntityList;
	}

	_size() {
		return this._notificationCollectionEntity().length;
	}

	_notificationCollectionEntity() {
		return this._entity && this._entity.getSubEntities(Rels.Notifications);
	}

}

class NotificationEntity {
	constructor(_entity) {
		this._entity = _entity;
	}

	count() {
		return this._entity && this._entity.properties && this._entity.properties.count;
	}

	type() {
		return this._entity && this._entity.properties && this._entity.properties.type;
	}

	getLink() {
		if (!this._entity.hasLinkByRel(Rels.Notifications.updatesSource)) {
			return;
		}

		return this._entity.getLinkByRel(Rels.Notifications.updatesSource).href;
	}

}
