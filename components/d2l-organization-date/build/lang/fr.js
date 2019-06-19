'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'ended': 'S’est terminé le {date} à {time}',
			'endsAt': 'Se termine le {date} à {time}',
			'startsAt': 'Commence le {date} à {time}'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);

