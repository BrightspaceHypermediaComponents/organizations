const fs = require('fs');
const sergeDirectories = require('../organizations.serge.json');
const englishFile = 'en.json';
sergeDirectories.forEach((sergeComponent) => {
	const directory = sergeComponent.source_dir + '/';
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
					throw 'No ' + filename;
				}

				fs.readFile(filename, (err, data) => {
					if (err) {
						throw err;
					}

					const obj = JSON.parse(data);
					const sortedObject = {};
					Object.keys(obj).sort((a, b) => {
						a = a.toLowerCase();
						b = b.toLowerCase();
						if (a < b) {
							return -1;
						} else if (a > b) {
							return 1;
						}
						return 0;
					}).forEach((key) => {
						if (englishContent[key] && englishContent[key].context) {
							sortedObject[key] = {
								translation: obj[key].translation,
								context: englishContent[key].context
							};
						}
					});

					var json = JSON.stringify(sortedObject, null, 2);
					fs.writeFile(filename, json, (err) => {
						if (err) throw err;
						console.log('The file has been saved!');
					});
				});
			});
		});
	});
});
