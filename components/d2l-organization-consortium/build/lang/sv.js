'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'errorFull': 'Hoppsan! Vi kunde inte hämta information för {num} av dina flikar. Prova att uppdatera sidan',
			'errorShort': 'Hoppsan',
			'loading': 'Laddar',
			'newNotifications': '{name} – Du har nya varningar',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
