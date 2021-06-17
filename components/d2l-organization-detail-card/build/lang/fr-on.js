import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrOnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fron = {
			'CompletedModulesProgress': 'Modules achevés par rapport au Total de modules dans {title}'
		};
	}
};

export const LangFrOn = dedupingMixin(LangFrOnImpl);
