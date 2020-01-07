'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'errorFull': 'Hoppsan! Vi kunde inte hämta information för {num} av dina flikar. Prova att uppdatera sidan',
			'errorShort': 'Hoppsan',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': 'Laddar',
			'newNotifications': '{name} – Du har nya varningar',
			'newNotificationsAlert': 'Du har nya varningar i några av dina andra konton',
			'otherAccounts': 'Andra konton'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
