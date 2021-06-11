import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangCyGbImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.cygb = {
			'errorFull': 'O na! Doedd dim modd i ni nôl gwybodaeth ar gyfer {num} o’ch tabiau. Ceisiwch ail-lwytho’r dudalen',
			'errorShort': 'O na!',
			'impersonationWarning': 'Ni allwch gyrchu tabiau eraill tra eich bod chi’n dynwared.',
			'loading': 'Yn llwytho',
			'newNotifications': '{Name} - Mae gennych chi hysbysiadau newydd',
			'newNotificationsAlert': 'Mae gennych chi hysbysiadau newydd mewn rhai o’ch cyfrifon eraill',
			'otherAccounts': 'Cyfrifon Eraill'
		};
	}
};

export const LangCyGb = dedupingMixin(LangCyGbImpl);
