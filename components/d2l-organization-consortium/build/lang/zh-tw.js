'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'loading': 'Loading'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);
