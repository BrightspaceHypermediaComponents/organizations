import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'CompletedModulesProgress': 'Módulos completados por los módulos totales en {title}'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);
