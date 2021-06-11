import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'CompletedModulesProgress': '{title} の合計モジュールのうち完了したモジュール'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);
