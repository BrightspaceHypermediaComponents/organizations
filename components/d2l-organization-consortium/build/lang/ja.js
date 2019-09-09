'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'loading': 'Loading'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);
