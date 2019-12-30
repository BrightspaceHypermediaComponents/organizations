'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'errorFull': 'عذرًا! تعذّر علينا إحضار معلومات لـ {num} من علامات التبويب. حاول تحديث الصفحة',
			'errorShort': 'عذرًا',
			'loading': 'يتم الآن التحميل',
			'newNotifications': '{name} - لديك تنبيهات جديدة',
			'newNotificationsAlert': 'لديك تنبيهات جديدة في بعض حساباتك الأخرى',
			'otherAccounts': 'حسابات أخرى'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);
