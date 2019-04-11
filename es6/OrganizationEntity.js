'use strict';

import { Rels } from 'd2l-hypermedia-constants';
import 'd2l-polymer-siren-behaviors/store/entity-store.js';

/** Allows one to manage the event store listeners. Makes it easy to update, add and remove a listener for the entity store. */
class EntityListener {
	constructor() {
		this._href;
		this._token;
		this._onChange;
	}

	add(href, token, onChange) {
		if (!this._validate(href, token, onChange)) {
			return;
		}

		this._href = href;
		this._token = token;
		this._onChange = onChange;

		window.D2L.Siren.EntityStore.addListener(this._href, this._token, this._onChange);
		window.D2L.Siren.EntityStore.fetch(href, token);
	}

	update(href, token, onChange) {
		if (href === this._href || token === this._token || onChange === this._onChange) {
			return;
		}
		this._removeListener();
		this._addListener(href, token, onChange);
	}

	remove() {
		if (!this._validate(this._href, this._token, this._onChange)) {
			return;
		}
		window.D2L.Siren.EntityStore.removeListener(this._href, this._token, this._listener);
	}

	_validate(href, token, onChange) {
		// token can be empty.
		return href && typeof onChange === 'function';
	}
}

/**
 * This creates and fetch a new entity. Whenever the entity changes onChange is called.
 * @param {Function} entityType The type of the entity. For example OrganizationEntity
 * @param {String} href Href of the entity to be created
 * @param {String|Token|Null} token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
 * @param {Function} onChange Callback function that accepts an {entityType} to be called when entity changes.
 */
export const entityFactory = (entityType, href, token, onChange) => {
	const entityListener = new EntityListener();
	const onChangeWrapped = (entity) => {
		const entityWrapped = new entityType(entity, token, entityListener);
		onChange(entityWrapped);
	};

	// This add the listener then calls the fetch.
	entityListener.add(href, token, onChangeWrapped);
};

/**
 * Some times the entity doesn't exists so this allows the cleanup code to be cleaner.
 * @param {Object|Null} entity Object that is of an Entity type.
 */
export const dispose = (entity) => {
	entity && entity.decompose && entity.dispose();
};


class Entity {
	/**
	 * Primes the object used by the entityFactory. Should never be called outside.
	 * @param {Object} entity A hypermedia siren entity as defined by [the siren specification]{@link https://github.com/kevinswiber/siren}
	 * @param {String|Function|null} token JWT Token for brightspace | a function that returns a JWT token for brightspace | null (defaults to cookie authentication in a browser)
	 * @param {Function} listener Listener helper class
	 */
	constructor(entity, token, listener) {
		if (new.target === Entity) {
			throw new TypeError('Cannot construct Entity instances directly');
		}
		this._entity = entity;
		this._subEntities = new Map();
		this._token = token;
		this._listener = listener;
	}

	/**
	 * Cleans up this entity by deleting the callbacks listeners stored in the entity store.
	 */
	dispose() {
		this._subEntities.forEach(entity => dispose(entity));
		this._listener.remove();
	}

	/**
	 * Protected: Add a listener to a subentity of this entity.
	 * @param {*} entityType A entity class that extends this class.
	 * @param {*} href Href of the entity to be created
	 * @param {*} onChange callback function that accepts an {entityType} to be called when subentity changes.
	 */
	_subEntity(entityType, href, onChange) {
		// Clean up if that href has already been added.
		if (this._subEntities.has(href)) {
			dispose(this._subEntities.get(href));
		}
		entityFactory(entityType, href, this._token, (entity) => {
			this._subEntities.set(href, entity);
			onChange(entity);
		});
	}
}


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

	onSemesterChange(onChange) {
		const semesterHref = this.semesterHref();
		// _subEntity builds new sub entity and allows this object to track it.
		// So all sub entities are dispose when this object is disposed.
		semesterHref && this._subEntity(OrganizationEntity, semesterHref, this._token, onChange);
	}
}

