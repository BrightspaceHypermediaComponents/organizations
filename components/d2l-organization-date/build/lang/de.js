'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'ended': 'Beendet am {date} um {time}',
			'endsAt': 'Endet am {date} um {time}',
			'startsAt': 'Beginnt am {date} um {time}'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);

