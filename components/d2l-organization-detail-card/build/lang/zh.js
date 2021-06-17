import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'CompletedModulesProgress': '完成 {title} 中的总模块中的模块'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);
