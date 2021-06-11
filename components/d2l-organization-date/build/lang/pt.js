import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'ended': 'Encerrado em {date} às {time}',
			'endsAt': 'Encerra em {date} às {time}',
			'startsAt': 'Inicia em {date} às {time}'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);
