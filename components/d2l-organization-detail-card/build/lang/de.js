'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'CompletedModulesProgress': 'Completed Modules by Total Modules in {title}'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);
