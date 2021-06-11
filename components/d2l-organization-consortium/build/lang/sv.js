
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'errorFull': 'Hoppsan! Vi kunde inte hämta information för {num} av dina flikar. Prova att uppdatera sidan',
			'errorShort': 'Hoppsan',
			'impersonationWarning': 'Du kan inte komma åt andra flikar när du personifierar.',
			'loading': 'Laddar',
			'newNotifications': '{name} – Du har nya varningar',
			'newNotificationsAlert': 'Du har nya varningar i några av dina andra konton',
			'otherAccounts': 'Andra konton'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
