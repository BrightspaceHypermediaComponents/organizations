'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'errorFull': '죄송합니다. {num}개의 탭에 대한 정보를 가져올 수 없습니다. 페이지를 새로 고침하십시오.',
			'errorShort': '죄송합니다.',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': '로드 중',
			'newNotifications': '{name}개 - 새로운 알림이 있습니다.',
			'newNotificationsAlert': '일부 다른 계정에 새 알림이 있습니다.',
			'otherAccounts': '기타 계정'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);
