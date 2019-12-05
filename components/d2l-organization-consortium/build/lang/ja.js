'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'errorFull': '申し訳ありません。{num} 個のタブの情報をフェッチできませんでした。ページを更新してみてください',
			'errorShort': '申し訳ありません',
			'loading': '読み込み中',
			'newNotifications': '{name} さん - 新しいお知らせがあります',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);
