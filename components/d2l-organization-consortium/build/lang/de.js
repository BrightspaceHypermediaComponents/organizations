'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'errorFull': 'Hoppla! Es konnten keine Informationen für {num} Ihrer Registerkarten abgerufen werden. Versuchen Sie, die Seite zu aktualisieren',
			'errorShort': 'Hoppla',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': 'Wird geladen',
			'newNotifications': '{name} – Sie haben neue Benachrichtigungen',
			'newNotificationsAlert': 'Sie haben neue Benachrichtigungen in einigen Ihrer anderen Konten',
			'otherAccounts': 'Andere Konten'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);
