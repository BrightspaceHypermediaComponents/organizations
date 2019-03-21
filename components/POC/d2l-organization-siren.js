'use strict';

import 'd2l-polymer-siren-behaviors/store/entity-store.js';
import {SirenStoreListener, createWrapperListener} from 'SirenStoreListener.js';
import { Rels } from 'd2l-hypermedia-constants';

export class OrganizationEntity {
	constructor(entity, token) {
		this._entity = entity;
		this._token = token;
		this._semester;
	}
	tryGetCode() {
		return this._entity && this._entity.properties && this._entity.properties.code;
	}

	listenSemester(listener) {
		if (!this._entity || !this._entity.hasLinkByRel(Rels.parentSemester)) {
			return;
		}

		var semesterHref = this._entity.getLinkByRel(Rels.parentSemester).href;
		if (!this._semester) {
			this._semester = new SemesterListener(semesterHref, this._token, listener);
		} else {
			this._semester.updateListener(semesterHref, this._token, listener);
		}
	}
}

export class OrganizationListener extends SirenStoreListener {
	constructor(href, token, listener) {
		const wrapperListener = createWrapperListener(OrganizationEntity, href, token, listener);
		super(href, token, wrapperListener);
	}

	updateListener(href, token, listener) {
		const wrapperListener = createWrapperListener(OrganizationEntity, href, token, listener);
		super.updateListener(href, token, wrapperListener);
	}
}

export class SemesterEntity {
	constructor(entity, token) {
		this._entity = entity;
		this._token = token;
	}
	tryGetName() {
		return this._entity && this._entity.properties && this._entity.properties.name;
	}
}

export class SemesterListener extends SirenStoreListener {
	constructor(href, token, listener) {
		const wrapperListener = createWrapperListener(SemesterEntity, href, token, listener);
		super(href, token, wrapperListener);
	}

	updateListener(href, token, listener) {
		const wrapperListener = createWrapperListener(SemesterEntity, href, token, listener);
		super.updateListener(href, token, wrapperListener);
	}
}
