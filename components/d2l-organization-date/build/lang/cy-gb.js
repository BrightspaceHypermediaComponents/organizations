import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangCygbImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.cygb = {
			'ended': 'Wedi dod i ben ar {date} am {time}',
			'endsAt': 'Yn dod i ben ar {date} am {time}',
			'startsAt': 'Yn dechrau ar {date} am {time}'
		};
	}
};

export const LangCygb = dedupingMixin(LangCygbImpl);
