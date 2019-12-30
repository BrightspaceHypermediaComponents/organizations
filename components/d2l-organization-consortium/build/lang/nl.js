'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'errorFull': 'Oeps! We kunnen geen gegevens ophalen voor {num} van uw tabbladen. Probeer de pagina te vernieuwen',
			'errorShort': 'Oeps',
			'loading': 'Laden',
			'newNotifications': '{name} - U hebt nieuwe waarschuwingen',
			'newNotificationsAlert': 'U hebt nieuwe waarschuwingen in enkele van uw andere accounts',
			'otherAccounts': 'Andere accounts'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);
