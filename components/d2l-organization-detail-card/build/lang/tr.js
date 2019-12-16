'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'CompletedModulesProgress': '{title} içinde Tamamlanmış Modüllerin Toplam Modüllere Oranı'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);
