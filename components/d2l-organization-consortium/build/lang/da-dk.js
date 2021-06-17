import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDaDkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'errorFull': 'Hovsa! Vi kunne ikke hente oplysninger for {num} af dine faner. Prøv at opdatere siden',
			'errorShort': 'Hovsa',
			'impersonationWarning': 'Du kan ikke få adgang til andre faner, når du repræsenterer andre brugere.',
			'loading': 'Indlæser',
			'newNotifications': '{name} – Du har nye notifikationer',
			'newNotificationsAlert': 'Du har nye alarmer på nogle af dine andre konti',
			'otherAccounts': 'Andre konti'
		};
	}
};

export const LangDaDk = dedupingMixin(LangDaDkImpl);
