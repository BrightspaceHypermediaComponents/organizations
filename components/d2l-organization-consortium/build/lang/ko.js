'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'errorFull': '죄송합니다. {num}개의 탭에 대한 정보를 가져올 수 없습니다. 페이지를 새로 고침하십시오.',
			'errorShort': '죄송합니다.',
			'loading': '로드 중',
			'newNotifications': '{name} - 새로운 알림이 있습니다.',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);
