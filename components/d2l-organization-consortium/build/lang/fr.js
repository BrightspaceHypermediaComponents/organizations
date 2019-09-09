'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'loading': 'Loading'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);
