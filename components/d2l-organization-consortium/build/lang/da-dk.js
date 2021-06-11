
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDadkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page',
			'errorShort': 'Oops',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': 'Loading',
			'newNotifications': '{name} - Du har nye notifikationer',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangDadk = dedupingMixin(LangDadkImpl);
