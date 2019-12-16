'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'errorFull': 'Oups! Nous avons été incapables d’extraire l’information de {num} de vos onglets. Veuillez rafraîchir la page',
			'errorShort': 'Oups!',
			'loading': 'Chargement',
			'newNotifications': '{name} - Vous avez de nouvelles alertes',
			'newNotificationsAlert': 'You have new alerts in some of your other accounts',
			'otherAccounts': 'Other Accounts'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);
