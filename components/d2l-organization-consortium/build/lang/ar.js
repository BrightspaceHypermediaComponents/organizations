'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page',
			'errorShort': 'Oops',
			'loading': 'يتم الآن التحميل',
			'newNotifications': '{name} - لديك تنبيهات جديدة'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);
