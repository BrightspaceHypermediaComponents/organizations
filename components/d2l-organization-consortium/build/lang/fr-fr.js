import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'errorFull': 'Oups ! Nous n’avons pas pu récupérer les informations pour {num} de vos onglets. Essayez d’actualiser la page',
			'errorShort': 'Oups',
			'impersonationWarning': 'Vous ne pouvez pas accéder à d’autres onglets lors d’un emprunt d’identité.',
			'loading': 'Chargement en cours',
			'newNotifications': '{name} – Vous avez de nouvelles alertes',
			'newNotificationsAlert': 'Vous avez de nouvelles alertes dans certains de vos autres comptes',
			'otherAccounts': 'Autres comptes'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);
