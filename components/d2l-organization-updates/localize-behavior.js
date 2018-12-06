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
window.D2L.PolymerBehaviors.Organization.Updates = window.D2L.PolymerBehaviors.Organization.Updates || {};
/*
* @polymerBehavior D2L.PolymerBehaviors.Organization.Updates.LocalizeBehaviorImpl
*/
D2L.PolymerBehaviors.Organization.Updates.LocalizeBehaviorImpl = {
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
* @polymerBehavior D2L.PolymerBehaviors.Organization.Updates.LocalizeBehavior
*/
D2L.PolymerBehaviors.Organization.Updates.LocalizeBehavior = [
	D2L.PolymerBehaviors.LocalizeBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LocalizeBehaviorImpl,
	D2L.PolymerBehaviors.Organization.Updates.LangArBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangDeBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangEnBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangEsBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangFiBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangFrBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangJaBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangKoBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangNlBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangPtBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangSvBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangTrBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangZhtwBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LangZhBehavior
];
