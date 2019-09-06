'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'loading': 'Loading'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);
