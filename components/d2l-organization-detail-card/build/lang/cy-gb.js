import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangCyGbImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.cygb = {
			'CompletedModulesProgress': 'Modiwlau wedi’u Cwblhau yn ôl Cyfanswm y Modiwlau yn {title}'
		};
	}
};

export const LangCyGb = dedupingMixin(LangCyGbImpl);
