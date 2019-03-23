'use strict';

import 'd2l-polymer-siren-behaviors/store/entity-store.js';

export function entityFactory(entityType, href, token, onChange) {
	const entityListener = new EntityListener();

	const onChangeWrapped = (entity) => {
		if (!entity) {
			window.D2L.Siren.EntityStore.fetch(href, token);
			return;
		}
		const entityWrapped = new entityType(entity, token, entityListener);
		onChange(entityWrapped);
	};

	entityListener.add(href, token, onChangeWrapped);
}

export function decompose(entity) {
	entity && entity.decompose && entity.decompose();
}
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

	_subEntity(entityType, href, token, onChange) {
		if (this._subEntities.has(href)) {
			this._subEntities.get(href).decomposed();
		}
		entityFactory(entityType, href, token, (entity) => {
			this._subEntities.set(href, entity);
			onChange(entity);
		});
	}
}

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
