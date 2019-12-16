'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'CompletedModulesProgress': 'Slutförda moduler av moduler totalt i {title}'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
