
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'ended': 'تم الانتهاء بتاريخ {date} عند {time}',
			'endsAt': 'ينتهي بتاريخ {date} عند {time}',
			'startsAt': 'يبدأ بتاريخ {date} عند {time}'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);
