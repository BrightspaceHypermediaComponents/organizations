import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.eses = {
			'ended': 'Finalizado el {date} a las {time}',
			'endsAt': 'Finaliza el {date} a las {time}',
			'startsAt': 'Comienza el {date} a las {time}'
		};
	}
};

export const LangEsEs = dedupingMixin(LangEsEsImpl);
