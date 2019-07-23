'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = {
			'ended': 'Ended {date} at {time}',
			'endsAt': 'Ends {date} at {time}',
			'startsAt': 'Starts {date} at {time}'
		};
	}
};

export const LangEn = dedupingMixin(LangEnImpl);
