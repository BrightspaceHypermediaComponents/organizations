'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'errorFull': '糟糕！我们无法提取您的 {num} 个选项卡的信息。请尝试刷新页面',
			'errorShort': '糟糕',
			'loading': '正在加载',
			'newNotifications': '{name} - 您有新提示',
			'newNotificationsAlert': '您的其他账户中有新提示',
			'otherAccounts': '其他账户'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);
