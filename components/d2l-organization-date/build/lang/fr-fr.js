import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'ended': 'Terminé le {date} à {time}',
			'endsAt': 'Termine le {date} à {time}',
			'startsAt': 'Commence le {date} à {time}'
		};
	}
};

export const LangFrFr = dedupingMixin(LangFrFrImpl);
