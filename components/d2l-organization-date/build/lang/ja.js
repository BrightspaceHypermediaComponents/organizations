'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'ended': '{date} {time} に終了済み',
			'endsAt': '{date} {time} に終了',
			'startsAt': '{date} {time} に開始'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);

