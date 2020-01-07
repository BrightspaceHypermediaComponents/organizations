'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'errorFull': 'Lo sentimos. No pudimos capturar la información de {num} de sus pestañas. Intente actualizar la página.',
			'errorShort': 'Lo sentimos',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': 'Cargando',
			'newNotifications': '{name} - Tiene nuevas alertas',
			'newNotificationsAlert': 'Tiene nuevas alertas en algunas de sus otras cuentas',
			'otherAccounts': 'Otras cuentas'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);
