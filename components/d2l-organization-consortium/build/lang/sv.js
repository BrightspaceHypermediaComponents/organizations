'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'loading': 'Loading'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
