import { resolveUrl } from "@polymer/polymer/lib/utils/resolve-url.js";

export async function getLocalizeResources(langs, importMetaUrl) {
	const imports = [];
	let supportedLanguage;
	for (const language of langs.reverse()) {
		switch (language) {
			case "en":
				supportedLanguage = "en";
				imports.push(import(resolveUrl("./lang/en.js", importMetaUrl)));
				break;
			case "fr":
				supportedLanguage = "fr";
				imports.push(import(resolveUrl("./lang/fr.js", importMetaUrl)));
				break;
		}
	}

	const translationFiles = await Promise.all(imports);
	const langterms = {};
	for (const translationFile of translationFiles) {
		for (const langterm in translationFile.default) {
			langterms[langterm] = translationFile.default[langterm];
		}
	}

	return {
		language: supportedLanguage,
		resources: langterms
	};
}
