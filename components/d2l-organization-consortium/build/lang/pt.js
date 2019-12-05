'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'errorFull': 'Opa! Não foi possível obter informações para {num} de suas guias. Tente atualizar a página',
			'errorShort': 'Opa',
			'loading': 'Carregando',
			'newNotifications': '{name} - Você tem novos alertas',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);
