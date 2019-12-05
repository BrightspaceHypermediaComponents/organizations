'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'errorFull': 'Üzgünüz! Sekmelerinizden {num} için bilgi alınamadı. Sayfayı yenilemeyi deneyin',
			'errorShort': 'Üzgünüz',
			'loading': 'Yükleniyor',
			'newNotifications': '{name} - Yeni uyarılarınız var',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);
