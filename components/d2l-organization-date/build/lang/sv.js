
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'ended': 'Slutade {date} kl. {time}',
			'endsAt': 'Slutar {date} kl. {time}',
			'startsAt': 'Startar {date} kl. {time}'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
