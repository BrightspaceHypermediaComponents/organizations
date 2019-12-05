'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'errorFull': 'Hoppla! Es konnten keine Informationen für {num} Ihrer Registerkarten abgerufen werden. Versuchen Sie, die Seite zu aktualisieren',
			'errorShort': 'Hoppla',
			'loading': 'Wird geladen',
			'newNotifications': '{name} – Sie haben neue Benachrichtigungen',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);
