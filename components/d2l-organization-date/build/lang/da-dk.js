import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDaDkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'ended': 'Sluttede {date} kl. {time}',
			'endsAt': 'Slutter {date} kl. {time}',
			'startsAt': 'Begynder {date} kl. {time}'
		};
	}
};

export const LangDaDk = dedupingMixin(LangDaDkImpl);
