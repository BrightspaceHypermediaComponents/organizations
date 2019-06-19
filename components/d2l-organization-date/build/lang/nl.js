'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'ended': 'Geëindigd op {date} om {time}',
			'endsAt': 'Eindigt op {date} om {time}',
			'startsAt': 'Start op {date} om {time}'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

