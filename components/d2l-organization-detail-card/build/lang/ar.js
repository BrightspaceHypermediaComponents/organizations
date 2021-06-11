import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'CompletedModulesProgress': 'الوحدات النمطية المكتملة من إجمالي الوحدات النمطية في {title}'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);
