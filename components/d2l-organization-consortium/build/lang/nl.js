'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'loading': 'Loading',
			'errorShort': 'Oops',
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);
