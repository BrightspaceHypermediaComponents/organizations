'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'errorFull': 'Oups! Nous avons été incapables d’extraire l’information de {num} de vos onglets. Veuillez rafraîchir la page',
			'errorShort': 'Oups!',
			'impersonationWarning': 'Vous ne pouvez pas accéder à d’autres onglets lorsque vous personnifiez un autre utilisateur.',
			'loading': 'Chargement en cours',
			'newNotifications': '{name} - Vous avez de nouvelles alertes',
			'newNotificationsAlert': 'Vous avez de nouvelles alertes dans certains de vos autres comptes.',
			'otherAccounts': 'Autres comptes'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);
