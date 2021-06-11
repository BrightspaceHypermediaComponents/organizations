import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFronImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fron = {
			'ended': 'S’est terminé le {date} à {time}',
			'endsAt': 'Se termine le {date} à {time}',
			'startsAt': 'Commence le {date} à {time}'
		};
	}
};

export const LangFron = dedupingMixin(LangFronImpl);
