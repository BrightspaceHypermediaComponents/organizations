import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'CompletedModulesProgress': 'Nombre de modules terminés multiplié par le nombre total de modules dans le cours {title}'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);
