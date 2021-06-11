import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'CompletedModulesProgress': 'Nombre de modules terminés multiplié par le nombre total de modules dans le cours {title}'
		};
	}
};

export const LangFrFr = dedupingMixin(LangFrFrImpl);
