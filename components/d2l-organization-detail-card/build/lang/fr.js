
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'CompletedModulesProgress': 'Modules achevés par rapport au Total de modules dans {title}'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);
