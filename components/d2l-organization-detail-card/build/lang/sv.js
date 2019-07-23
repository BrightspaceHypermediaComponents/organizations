'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'CompletedModulesProgress': 'Completed Modules by Total Modules in {title}'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
