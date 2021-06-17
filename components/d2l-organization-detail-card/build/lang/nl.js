import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'CompletedModulesProgress': 'Voltooide modules door totaal aantal modules in {title}'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);
