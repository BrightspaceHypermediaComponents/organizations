'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'ended': 'Finalizado {date} a la(s) {time}',
			'endsAt': 'Finaliza {date} a la(s) {time}',
			'startsAt': 'Comienza {date} a la(s) {time}'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);

