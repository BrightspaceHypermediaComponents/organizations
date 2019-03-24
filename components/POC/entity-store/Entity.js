'use strict';

import 'd2l-polymer-siren-behaviors/store/entity-store.js';

// This creates and fetch a new entity. Whenever the entity changes onChange is called.
export function entityFactory(entityType, href, token, onChange) {
	const entityListener = new EntityListener();
	const onChangeWrapped = (entity) => {
		const entityWrapped = new entityType(entity, token, entityListener);
		onChange(entityWrapped);
	};

	// This add the listener then calls the fetch.
	entityListener.add(href, token, onChangeWrapped);
}

// Some times the entity doesn't exists so this allows the cleanup code to be cleaner.
export function decompose(entity) {
	entity && entity.decompose && entity.decompose();
}

// This is an abstract class.  Allows the user to create domain specific entity class
export class Entity {
	constructor(entity, token, listener) {
		this._entity = entity;
		// eslint-disable-next-line no-undef
		this._subEntities = new Map();
		this._token = token;
		this._listener = listener;
	}

	decompose() {
		this._subEntities.forEach(entity => entity.decompose());
		this._listener.remove();
	}

	// protected method to keep track of sub entities.
	_subEntity(entityType, href, token, onChange) {
		// Clean up if that href has already been added.
		if (this._subEntities.has(href)) {
			this._subEntities.get(href).decomposed();
		}
		entityFactory(entityType, href, token, (entity) => {
			this._subEntities.set(href, entity);
			onChange(entity);
		});
	}
}

// Allows one to manage the event store listeners. Makes it easy to update, add and remove a listener for the entity store.
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
		return href && (typeof token === 'string' || typeof token === 'function') && typeof onChange === 'function';
	}
}
