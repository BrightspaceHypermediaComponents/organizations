'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'ended': 'Ended {date} at {time}',
			'endsAt': 'Ends {date} at {time}',
			'startsAt': 'Starts {date} at {time}'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);

