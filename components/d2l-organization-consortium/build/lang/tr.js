'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'errorFull': 'Üzgünüz! Sekmelerinizden {num} için bilgi alınamadı. Sayfayı yenilemeyi deneyin',
			'errorShort': 'Üzgünüz',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': 'Yükleniyor',
			'newNotifications': '{name} - Yeni uyarılarınız var',
			'newNotificationsAlert': 'Diğer hesaplarınızdan bazılarında yeni uyarılarınız var',
			'otherAccounts': 'Diğer Hesaplar'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);
