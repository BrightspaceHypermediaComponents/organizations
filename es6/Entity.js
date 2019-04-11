'use strict';
/**
 * Abstract Entity class to help create entity classes.
 * @type Entity
 * @export
 * @mixinClass Entity
 */
export class Entity {
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
		this._token = token;
		this._listener = listener;
	}

	/**
	 * Cleans up this entity by deleting the callbacks listeners stored in the entity store.
	 */
	dispose() {
		this._listener.remove();
	}
}
