import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'ended': '已于 {date} {time} 结束',
			'endsAt': '{date} {time} 结束',
			'startsAt': '{date} {time} 开始'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);
