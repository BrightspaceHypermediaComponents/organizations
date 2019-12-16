'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'errorFull': 'Lo sentimos. No pudimos capturar la información de {num} de sus pestañas. Intente actualizar la página.',
			'errorShort': 'Lo sentimos',
			'loading': 'Cargando',
			'newNotifications': '{name} - Tiene nuevas alertas',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);
