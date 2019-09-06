'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = {
			'loading': 'Loading'
		};
	}
};

export const LangEn = dedupingMixin(LangEnImpl);
