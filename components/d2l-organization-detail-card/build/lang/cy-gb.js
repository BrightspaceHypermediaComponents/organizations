import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangCygbImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.cygb = {
			'CompletedModulesProgress': 'Modiwlau wedi’u Cwblhau yn ôl Cyfanswm y Modiwlau yn {title}'
		};
	}
};

export const LangCygb = dedupingMixin(LangCygbImpl);
