const fs = require('fs');
const sergeDirectories = require('../organizations.serge.json');
const englishFile = 'en.json';

sergeDirectories.forEach((sergeComponent) => {
	if (sergeComponent.parser_plugin && sergeComponent.parser_plugin.plugin === 'parse_js') {
		return;
	}
	const directory = `${sergeComponent.source_dir}/`;
	fs.readdir(directory, (err, filenames) => {
		if (err) {
			throw err;
		}
		const englishPath = directory + englishFile;
		let englishContent = {};
		fs.exists(englishPath, exists => {
			if (!exists) {
				throw 'No english file.';
			}
			fs.readFile(englishPath, (err, data) => {
				if (err) {
					throw err;
				}
				englishContent = JSON.parse(data);

			});
		});
		filenames.forEach((filename) => {
			filename = directory + filename;

			fs.exists(filename, exists => {
				if (!exists) {
					throw `No ${filename}`;
				}

				fs.readFile(filename, (err, data) => {
					if (err) {
						throw err;
					}

					const currentLang = JSON.parse(data);
					const sortedcurrentLang = {};
					Object.keys(englishContent).sort((a, b) => {
						a = a.toLowerCase();
						b = b.toLowerCase();
						if (a < b) {
							return -1;
						} else if (a > b) {
							return 1;
						}
						return 0;
					}).forEach((key) => {
						if (englishContent[key]) {
							sortedcurrentLang[key] = {
								translation: (currentLang[key] && currentLang[key].translation) || englishContent[key].translation,
								context: englishContent[key].context
							};
						}
					});

					const json = JSON.stringify(sortedcurrentLang, null, 2);
					fs.writeFile(filename, json, (err) => {
						if (err) throw err;
					});
				});
			});
		});
	});
});
