import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'CompletedModulesProgress': 'Módulos concluídos por total de módulos em {title}'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);
