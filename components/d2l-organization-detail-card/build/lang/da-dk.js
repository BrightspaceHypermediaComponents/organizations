import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDaDkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'CompletedModulesProgress': 'Fuldførte moduler efter samlet antal moduler i {title}'
		};
	}
};

export const LangDaDk = dedupingMixin(LangDaDkImpl);
