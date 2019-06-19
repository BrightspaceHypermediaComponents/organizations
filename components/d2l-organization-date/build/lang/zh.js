'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'ended': '{date} {time} 已结束',
			'endsAt': '{date} {time} 结束',
			'startsAt': '{date} {time} 开始'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);

