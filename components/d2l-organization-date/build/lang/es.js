import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'ended': 'Finalizado el {date} a la(s) {time}',
			'endsAt': 'Finaliza el {date} a la(s) {time}',
			'startsAt': 'Comienza el {date} a la(s) {time}'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);
