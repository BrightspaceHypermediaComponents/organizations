import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-localize-behavior/d2l-localize-behavior.js';
import { LangAr } from './build/lang/ar.js';
import { LangCyGb } from './build/lang/cy-gb.js';
import { LangDaDk } from './build/lang/da-dk.js';
import { LangDe } from './build/lang/de.js';
import { LangEn } from './build/lang/en.js';
import { LangEs } from './build/lang/es.js';
import { LangEsEs } from './build/lang/es-es.js';
import { LangFi } from './build/lang/fi.js';
import { LangFr } from './build/lang/fr.js';
import { LangFrFr } from './build/lang/fr-fr.js';
import { LangFrOn } from './build/lang/fr-on.js';
import { LangJa } from './build/lang/ja.js';
import { LangKo } from './build/lang/ko.js';
import { LangNl } from './build/lang/nl.js';
import { LangPt } from './build/lang/pt.js';
import { LangSv } from './build/lang/sv.js';
import { LangTr } from './build/lang/tr.js';
import { LangZhtw } from './build/lang/zh-tw.js';
import { LangZh } from './build/lang/zh.js';

/* @polymerMixin */
const OrganizationDateLocalizeImpl = (superClass) => {
	const langMixins = [
		LangAr,
		LangCyGb,
		LangDaDk,
		LangDe,
		LangEn,
		LangEs,
		LangEsEs,
		LangFi,
		LangFr,
		LangFrFr,
		LangFrOn,
		LangJa,
		LangKo,
		LangNl,
		LangPt,
		LangSv,
		LangTr,
		LangZhtw,
		LangZh
	];
	let mixinLang = mixinBehaviors([D2L.PolymerBehaviors.LocalizeBehavior], superClass);
	for (const langMixin of langMixins) {
		mixinLang = langMixin(mixinLang);
	}
	return class extends mixinLang {
		static get properties() {
			return {
				locale: {
					type: String,
					value: function() {
						return document.documentElement.lang
							|| document.documentElement.getAttribute('data-lang-default')
							|| 'en-us';
					}
				}
			};
		}

		constructor() {
			super();
			this.resources = {
				'en': this.en,
				'ar': this.ar,
				'de': this.de,
				'es': this.es,
				'fi': this.fi,
				'fr': this.fr,
				'fr-on': this.fron,
				'ja': this.ja,
				'ko': this.ko,
				'nl': this.nl,
				'pt': this.pt,
				'sv': this.sv,
				'tr': this.tr,
				'zh': this.zh,
				'zh-tw': this.zhtw
			};
		}
	};
};

export const OrganizationDateLocalize = dedupingMixin(OrganizationDateLocalizeImpl);
