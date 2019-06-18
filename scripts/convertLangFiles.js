const fs = require('fs');
const sergeDirectories = require('../organizations.serge.json');

sergeDirectories.forEach((sergeComponent) => {
	const directory = sergeComponent.source_dir + '/';
	fs.readdir(directory, (err, filenames) => {
		if (err) {
			throw err;
		}
		filenames.forEach((filename) => {
			filename = directory + filename;

			fs.exists(filename, exists => {
				if (!exists) {
					console.log("file not exists");
					return;
				}

				fs.readFile(filename, (err, data) => {
					if (err) {
						console.log(err);
						return;
					}

					const obj = JSON.parse(data);
					Object.keys(obj).forEach((key) => {
						obj[key] = {
							translation: obj[key],
							context: ''
						};
					});

					var json = JSON.stringify(obj, null, 2);
					fs.writeFile(filename, json, (err) => {
						if (err) throw err;
						console.log('The file has been saved!');
					});
				});
			});
		});
	});
});
