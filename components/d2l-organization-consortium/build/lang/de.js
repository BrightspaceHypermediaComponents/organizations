'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'loading': 'Loading'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);
