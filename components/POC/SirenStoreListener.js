'use strict';

import 'd2l-polymer-siren-behaviors/store/entity-store.js';

export function createWrapperListener(wrapperClass, href, token, listener) {
	return (entity) => {
		if (!entity) {
			window.D2L.Siren.EntityStore.fetch(href, token);
			return;
		}
		const organization = new wrapperClass(entity, token);
		listener(organization);
	};
}

export class SirenStoreListener {
	constructor(href, token, listener) {
		this._addListener(href, token, listener);
	}

	updateListener(href, token, listener) {
		this._removeListener();
		this._addListener(href, token, listener);
	}

	_addListener(href, token, listener) {
		if (!href || (typeof token !== 'string' && typeof token !== 'function') || typeof listener !== 'function') {
			return;
		}

		this._href = href;
		this._token = token;
		this._listener = listener;

		window.D2L.Siren.EntityStore.addListener(this._href, this._token, this._listener);
	}

	_removeListener() {
		if (!this._href || (typeof this._token !== 'string' && typeof this._token !== 'function') || typeof this._listener !== 'function') {
			return;
		}
		window.D2L.Siren.EntityStore.removeListener(this._href, this._token, this._listener);
	}
}
