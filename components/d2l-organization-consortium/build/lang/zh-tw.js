import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhTwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'errorFull': '糟糕！我們無法擷取您 {num} 個頁籤中的資訊。請嘗試重新整理此頁面',
			'errorShort': '糟糕',
			'impersonationWarning': '模擬時無法存取其他頁籤。',
			'loading': '正在載入',
			'newNotifications': '{name} - 您有新警示',
			'newNotificationsAlert': '您的其他帳戶中有新的警示',
			'otherAccounts': '其他帳戶'
		};
	}
};

export const LangZhTw = dedupingMixin(LangZhTwImpl);
