import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'CompletedModulesProgress': '依據 {title} 中的單元總計顯示已完成的單元'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);
