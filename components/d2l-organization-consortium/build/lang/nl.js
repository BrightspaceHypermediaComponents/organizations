
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'errorFull': 'Oeps! We kunnen geen gegevens ophalen voor {num} van uw tabbladen. Probeer de pagina te vernieuwen',
			'errorShort': 'Oeps',
			'impersonationWarning': 'U kunt geen andere tabbladen openen terwijl u een gebruiker imiteert.',
			'loading': 'Bezig met laden',
			'newNotifications': '{name} - U hebt nieuwe waarschuwingen',
			'newNotificationsAlert': 'U hebt nieuwe waarschuwingen in enkele van uw andere accounts',
			'otherAccounts': 'Andere accounts'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);
