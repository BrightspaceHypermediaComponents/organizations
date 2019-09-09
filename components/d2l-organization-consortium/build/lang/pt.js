'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'loading': 'Loading'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);
