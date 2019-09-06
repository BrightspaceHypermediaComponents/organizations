'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFiImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fi = {
			'loading': 'Loading'
		};
	}
};

export const LangFi = dedupingMixin(LangFiImpl);
