'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'errorFull': 'Oups! Nous avons été incapables d’extraire l’information de {num} de vos onglets. Veuillez rafraîchir la page',
			'errorShort': 'Oups!',
			'impersonationWarning': 'You cannot access other tabs while impersonating.',
			'loading': 'Chargement de',
			'newNotifications': '{name} - Vous avez de nouvelles alertes',
			'newNotificationsAlert': 'Vous avez de nouvelles alertes dans certains de vos autres comptes.',
			'otherAccounts': 'Autres comptes'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);
