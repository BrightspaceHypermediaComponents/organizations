'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'loading': 'Loading',
			'errorShort': 'Oops',
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);
