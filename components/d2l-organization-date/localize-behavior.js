import 'd2l-localize-behavior/d2l-localize-behavior.js';
import './build/lang/ar.js';
import './build/lang/de.js';
import './build/lang/en.js';
import './build/lang/es.js';
import './build/lang/fi.js';
import './build/lang/fr.js';
import './build/lang/ja.js';
import './build/lang/ko.js';
import './build/lang/nl.js';
import './build/lang/pt.js';
import './build/lang/sv.js';
import './build/lang/tr.js';
import './build/lang/zh-tw.js';
import './build/lang/zh.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Organization = window.D2L.PolymerBehaviors.Organization || {};
window.D2L.PolymerBehaviors.Organization.Date = window.D2L.PolymerBehaviors.Organization.Date || {};
/*
* @polymerBehavior D2L.PolymerBehaviors.Organization.Date.LocalizeBehaviorImpl
*/
D2L.PolymerBehaviors.Organization.Date.LocalizeBehaviorImpl = {
	properties: {
		locale: {
			type: String,
			value: function() {
				return document.documentElement.lang
					|| document.documentElement.getAttribute('data-lang-default')
					|| 'en-us';
			}
		},
		resources: {
			value: function() {
				return {
					'en': this.en,
					'ar': this.ar,
					'de': this.de,
					'es': this.es,
					'fi': this.fi,
					'fr': this.fr,
					'ja': this.ja,
					'ko': this.ko,
					'nl': this.nl,
					'pt': this.pt,
					'sv': this.sv,
					'tr': this.tr,
					'zh': this.zh,
					'zh-tw': this.zhTw
				};
			}
		}
	}
};

/*
* @polymerBehavior D2L.PolymerBehaviors.Organization.Date.LocalizeBehavior
*/
D2L.PolymerBehaviors.Organization.Date.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.Organization.Date.LocalizeBehaviorImpl,
	D2L.PolymerBehaviors.Organization.Date.LangArBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangDeBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangEnBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangEsBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangFiBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangFrBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangJaBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangKoBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangNlBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangPtBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangSvBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangTrBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangZhtwBehavior,
	D2L.PolymerBehaviors.Organization.Date.LangZhBehavior
];
