import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.eses = {
			'CompletedModulesProgress': 'Módulos completados por los módulos totales en {title}'
		};
	}
};

export const LangEsEs = dedupingMixin(LangEsEsImpl);
