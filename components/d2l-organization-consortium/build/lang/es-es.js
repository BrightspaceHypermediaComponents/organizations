import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsesImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.eses = {
			'errorFull': 'Lo sentimos. No se ha podido obtener la información de {num} de las pestañas. Pruebe a actualizar la página',
			'errorShort': '¡Huy!',
			'impersonationWarning': 'No puede acceder a otras pestañas mientras realiza una suplantación.',
			'loading': 'Cargando',
			'newNotifications': '{name}: tiene nuevas alertas',
			'newNotificationsAlert': 'Tiene nuevas alertas en algunas de sus otras cuentas',
			'otherAccounts': 'Otras cuentas'
		};
	}
};

export const LangEses = dedupingMixin(LangEsesImpl);
