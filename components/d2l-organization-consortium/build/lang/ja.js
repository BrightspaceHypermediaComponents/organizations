'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'errorFull': '申し訳ありません。{num} 個のタブの情報をフェッチできませんでした。ページを更新してみてください',
			'errorShort': '申し訳ありません',
			'impersonationWarning': '代理処理中は他のタブにアクセスできません。',
			'loading': '読み込み中',
			'newNotifications': '{name} さん - 新しいお知らせがあります',
			'newNotificationsAlert': '他のアカウントに新規のお知らせがあります',
			'otherAccounts': 'その他のアカウント'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);
