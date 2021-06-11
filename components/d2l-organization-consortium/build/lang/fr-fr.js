
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page',
			'errorShort': 'Oops',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': 'Loading',
			'newNotifications': '{name} - Vous avez de nouvelles alertes',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);
