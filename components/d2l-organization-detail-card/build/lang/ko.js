import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'CompletedModulesProgress': '{title}의 전체 모듈에 의해 완료된 모듈'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);
