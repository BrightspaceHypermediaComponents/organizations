'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'ended': '已結束於 {date} 的 {time}',
			'endsAt': '結束於 {date} 的 {time}',
			'startsAt': '開始於 {date} 的 {time}'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);

