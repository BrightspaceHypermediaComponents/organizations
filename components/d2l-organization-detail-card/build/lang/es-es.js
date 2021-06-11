import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsesImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.eses = {
			'CompletedModulesProgress': 'Módulos completados por los módulos totales en {title}'
		};
	}
};

export const LangEses = dedupingMixin(LangEsesImpl);
