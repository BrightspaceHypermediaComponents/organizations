
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'ended': '已於 {date} 的 {time} 結束',
			'endsAt': '於 {date} 的 {time} 結束',
			'startsAt': '於 {date} 的 {time} 開始'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);
