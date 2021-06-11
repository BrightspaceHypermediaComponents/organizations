import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFiImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fi = {
			'ended': 'Ended {date} at {time}',
			'endsAt': 'Ends {date} at {time}',
			'startsAt': 'Starts {date} at {time}'
		};
	}
};

export const LangFi = dedupingMixin(LangFiImpl);
