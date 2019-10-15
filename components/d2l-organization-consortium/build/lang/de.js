'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page',
			'errorShort': 'Oops',
			'loading': 'Wird geladen',
			'newNotifications': '{name} – Sie haben neue Benachrichtigungen.'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);
