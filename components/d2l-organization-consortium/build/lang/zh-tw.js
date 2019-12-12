'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'errorFull': '糟糕！我們無法擷取您 {num} 個頁籤中的資訊。請嘗試重新整理此頁面',
			'errorShort': '糟糕',
			'loading': '正在載入',
			'newNotifications': '{name} - 您有新警示',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);
