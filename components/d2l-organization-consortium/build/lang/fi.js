'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFiImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fi = {
			'loading': 'Loading',
			'errorShort': 'Oops',
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page',
			'newNotifications': '{name} - You have new alerts'
		};
	}
};

export const LangFi = dedupingMixin(LangFiImpl);
