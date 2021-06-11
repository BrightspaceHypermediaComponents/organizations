
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'ended': '{date} tarihinde, şu saatte sona erdi: {time}',
			'endsAt': '{date} tarihinde, şu saatte sona erecek: {time}',
			'startsAt': '{date} tarihinde, şu saatte başlayacak: {time}'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);
