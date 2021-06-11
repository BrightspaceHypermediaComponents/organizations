
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'CompletedModulesProgress': 'Abgeschlossene Module von Modulen insgesamt in {title}'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);
