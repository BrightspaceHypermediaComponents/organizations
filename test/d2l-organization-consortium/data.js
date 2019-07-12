export const consortium1 = {
	'class': ['tokens'],
	'entities': [
		{
			'class': [
				'token'
			],
			'rel': [],
			'properties': {
				'tenant': '1cb16d6a-8557-4850-8846-3fa9b6174494',
				'token': 'token1'
			},
			'links': [
				{
					'rel': ['self'],
					'href': 'https://consortium.api.dev.brightspace.com/1cb16d6a-8557-4850-8846-3fa9b6174494'
				},
				{
					'rel': ['https://api.brightspace.com/rels/root'],
					'href': '../data/consortium/root1-consortium.json'
				}
			]
		},
		{
			'class': [
				'token'
			],
			'rel': [],
			'properties': {
				'tenant': '8b33e567-c616-4667-868b-fdfe9edc3a78',
				'token': 'token2'
			},
			'links': [
				{
					'rel': ['self'],
					'href': 'https://consortium.api.dev.brightspace.com/8b33e567-c616-4667-868b-fdfe9edc3a78'
				},
				{
					'rel': ['https://api.brightspace.com/rels/root'],
					'href': '../data/consortium/root2-consortium.json'
				}
			]
		}
	]
};

export const organization1 = {
	'properties': {
		'name': 'Consortium 1',
		'code': 'c1',
		'startDate': null,
		'endDate': null,
		'isActive': true,
		'description': ''
	},
	'links': [{
		'rel': ['https://api.brightspace.com/rels/notification-alerts'],
		'href': '../data/alerts-has-unread.json'
	}, {
		'rel': ['https://api.brightspace.com/rels/organization-homepage'],
		'href': '?consortium=1'
	}]
};

export const organization2 = {
	'properties': {
		'name': 'Consortium 2',
		'code': null,
		'startDate': null,
		'endDate': null,
		'isActive': true,
		'description': ''
	},
	'links': [{
		'rel': ['https://api.brightspace.com/rels/notification-alerts'],
		'href': '../data/alerts-no-unread.json'
	}, {
		'rel': ['https://api.brightspace.com/rels/organization-homepage'],
		'href': '?consortium=2'
	}]
};

export const hasUnread = {
	'properties': {
		'hasUnread': true
	}
};

export const noUnread = {
	'properties': {
		'hasUnread': false
	}
};

export const root1 = {
	'links': [
		{
			'rel': ['https://api.brightspace.com/rels/organization'],
			'href': '../data/consortium/organization1-consortium.json'
		}
	]
};

export const root2 = {
	'links': [
		{
			'rel': ['https://api.brightspace.com/rels/organization'],
			'href': '../data/consortium/organization2-consortium.json'
		}
	]
};

export const consortium2 = {
	'class': ['tokens'],
	'entities': [
		{
			'class': [
				'token'
			],
			'rel': [],
			'properties': {
				'tenant': '1cb16d6a-8557-4850-8846-3fa9b6174495',
				'token': 'token3'
			},
			'links': [
				{
					'rel': ['self'],
					'href': 'https://consortium.api.dev.brightspace.com/1cb16d6a-8557-4850-8846-3fa9b6174495'
				}, {
					'rel': ['https://api.brightspace.com/rels/root'],
					'href': '/root3'
				}
			]
		},
		{
			'class': [
				'token'
			],
			'rel': [],
			'properties': {
				'tenant': '8b33e567-c616-4667-868b-fdfe9edc3a79',
				'token': 'token4'
			},
			'links': [
				{
					'rel': ['self'],
					'href': 'https://consortium.api.dev.brightspace.com/8b33e567-c616-4667-868b-fdfe9edc3a79'
				}, {
					'rel': ['https://api.brightspace.com/rels/root'],
					'href': '/root4'
				}
			]
		}
	]
};

export const organization3 = {
	'properties': {
		'name': 'Consortium 3',
		'code': 'c3',
		'startDate': null,
		'endDate': null,
		'isActive': true,
		'description': ''
	},
	'links': [{
		'rel': ['https://api.brightspace.com/rels/notification-alerts'],
		'href': '/no-unread'
	}, {
		'rel': ['https://api.brightspace.com/rels/organization-homepage'],
		'href': '?consortium=3'
	}]
};

export const organization4 = {
	'properties': {
		'name': 'Consortium 4',
		'code': null,
		'startDate': null,
		'endDate': null,
		'isActive': true,
		'description': ''
	},
	'links': [{
		'rel': ['https://api.brightspace.com/rels/notification-alerts'],
		'href': '/has-unread'
	}, {
		'rel': ['https://api.brightspace.com/rels/organization-homepage'],
		'href': '?consortium=4'
	}]
};

export const root3 = {
	'links': [
		{
			'rel': ['https://api.brightspace.com/rels/organization'],
			'href': '/organization3'
		}
	]
};

export const root4 = {
	'links': [
		{
			'rel': ['https://api.brightspace.com/rels/organization'],
			'href': '/organization4'
		}
	]
};
