'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'ended': '{date}일 {time}에 종료됨',
			'endsAt': '{date}일 {time}에 종료',
			'startsAt': '{date}일 {time}에 시작'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);

