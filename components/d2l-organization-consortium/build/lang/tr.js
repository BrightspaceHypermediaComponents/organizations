
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'errorFull': 'Üzgünüz! Sekmelerinizden {num} için bilgi alınamadı. Sayfayı yenilemeyi deneyin',
			'errorShort': 'Üzgünüz',
			'impersonationWarning': 'Birinin yerine giriş yaptığınızda diğer sekmelere erişemezsiniz.',
			'loading': 'Yükleniyor',
			'newNotifications': '{name} - Yeni uyarılarınız var',
			'newNotificationsAlert': 'Diğer hesaplarınızdan bazılarında yeni uyarılarınız var',
			'otherAccounts': 'Diğer Hesaplar'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);
