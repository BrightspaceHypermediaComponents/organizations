import { resolveUrl } from '@polymer/polymer/lib/utils/resolve-url.js';

const SUPPORTED_LANGUAGES = ['en', 'fr'];
const cache = {};
const baseUrl = import.meta.url;

export async function getLocalizeResources(langs) {
	const supportedLanguages = langs.reverse().filter(language => {
		return SUPPORTED_LANGUAGES.indexOf(language) > -1;
	});

	const sergeLangterms = supportedLanguages.map(language => {
		const url = resolveUrl(`./lang/${language}.json`, baseUrl);
		if (cache[url]) {
			return cache[url];
		}

		const langterms = fetch(url).then(res => res.json()).then(json => {
			const langterms = {};
			for (const langterm in json) {
				langterms[langterm] = json[langterm].translation;
			}
			return langterms;
		});
		cache[url] = langterms;
		return langterms;
	});

	const responses = await Promise.all(sergeLangterms);

	const langterms = {};
	responses.forEach(language => {
		Object.assign(langterms, language);
	});

	return {
		language: supportedLanguages[supportedLanguages.length - 1],
		resources: langterms
	};
}
