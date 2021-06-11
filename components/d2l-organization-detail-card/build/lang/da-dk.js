
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDadkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'CompletedModulesProgress': 'Completed Modules by Total Modules in {title}'
		};
	}
};

export const LangDadk = dedupingMixin(LangDadkImpl);
