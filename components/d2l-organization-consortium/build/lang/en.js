
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = {
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page',
			'errorShort': 'Oops',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': 'Loading',
			'newNotifications': '{name} - You have new alerts',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangEn = dedupingMixin(LangEnImpl);
