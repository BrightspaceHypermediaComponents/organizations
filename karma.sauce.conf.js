/* eslint-env node */
const { createDefaultConfig } = require('@open-wc/testing-karma');
const merge = require('deepmerge');

const customLaunchers = {
	chrome: {
		base: 'SauceLabs',
		browserName: 'chrome',
		platform: 'OS X 10.13',
	},
	firefox: {
		base: 'SauceLabs',
		browserName: 'firefox',
		platform: 'OS X 10.13'
	},
	safari: {
		base: 'SauceLabs',
		browserName: 'safari',
		platform: 'OS X 10.13'
	},
	edge: {
		base: 'SauceLabs',
		browserName: 'microsoftedge',
		platform: 'Windows 10',
		version: 'latest'
	},
	edge_legacy: {
		base: 'SauceLabs',
		browserName: 'microsoftedge',
		platform: 'Windows 10',
		version: '18.17763'
	}
};

module.exports = config => {
	config.set(
		merge(createDefaultConfig(config), {
			files: [
				{ pattern: config.grep ? config.grep : 'test/**/*.js', type: 'module' },
			],
			// see the karma-esm docs for all options
			esm: {
				// if you are using 'bare module imports' you will need this option
				nodeResolve: true,
			},
			sauceLabs: {
				testName: 'Unit Tests'
			},
			client: {
				mocha: {
					timeout : 10000
				}
			},
			customLaunchers: customLaunchers,
			browsers: Object.keys(customLaunchers),
			browserDisconnectTimeout : 50000, // default 2000
			browserDisconnectTolerance : 3, // default 0
			browserNoActivityTimeout: 200000, // default 10000
			captureTimeout: 200000, // default 60000
			reporters: ['dots', 'saucelabs'],
			singleRun: true
		}),
	);
	return config;
};
