const fs = require('fs');
const sergeDirectories = require('../organizations.serge.json');

sergeDirectories.forEach((sergeComponent) => {
	const directory = `${sergeComponent.source_dir  }/`;
	fs.readdir(directory, (err, filenames) => {
		if (err) {
			throw err;
		}
		filenames.forEach((filename) => {
			filename = directory + filename;

			fs.exists(filename, exists => {
				if (!exists) {
					throw 'file not exists';
				}

				fs.readFile(filename, (err, data) => {
					if (err) {
						throw err;
					}

					const obj = JSON.parse(data);
					Object.keys(obj).forEach((key) => {
						if (typeof(obj[key]) === 'string') {
							obj[key] = {
								translation: obj[key],
								context: ''
							};
						}
					});

					const json = JSON.stringify(obj, null, 2);
					fs.writeFile(filename, json, (err) => {
						if (err) {
							throw err;
						}
					});
				});
			});
		});
	});
});
