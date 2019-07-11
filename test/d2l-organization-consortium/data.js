export const consortium = {
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
	'entities': [
		{
			'class': [
				'course-image'
			],
			'rel': [
				'https://api.brightspace.com/rels/organization-image'
			],
			'href': '../../data/image.json'
		}
	],
	'links': [{
		'rel': ['self'],
		'href': '../../data/organization-current.json'
	}, {
		'rel': ['https://api.brightspace.com/rels/parent-semester'],
		'href': '../../data/semester.json'
	}, {
		'rel': [
			'https://notifications.api.brightspace.com/rels/organization-notifications'
		],
		'href': '../../data/notification.json'
	}, {
		'rel': ['https://api.brightspace.com/rels/organization-homepage'],
		'href': '?consortium=1'
	}, {
		'rel': ['https://api.brightspace.com/rels/notification-alerts'],
		'href': '../data/alerts-has-unread.json'
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
	'entities': [
		{
			'class': [
				'course-image'
			],
			'rel': [
				'https://api.brightspace.com/rels/organization-image'
			],
			'href': '../../data/image.json'
		}
	],
	'links': [{
		'rel': ['self'],
		'href': '../../data/organization-current.json'
	}, {
		'rel': ['https://api.brightspace.com/rels/parent-semester'],
		'href': '../../data/semester.json'
	}, {
		'rel': [
			'https://notifications.api.brightspace.com/rels/organization-notifications'
		],
		'href': '../../data/notification.json'
	}, {
		'rel': ['https://api.brightspace.com/rels/organization-homepage'],
		'href': '?consortium=2'
	}, {
		'rel': ['https://api.brightspace.com/rels/notification-alerts'],
		'href': '../data/alerts-no-unread.json'
	}]
};

export const alerts1 = {
	'properties': {
		'hasUnread': true
	},
	'links': [{
		'rel': ['self'],
		'href': '../data/alerts-has-unread.json'
	}]
};

export const alerts2 = {
	'properties': {
		'hasUnread': false
	},
	'links': [{
		'rel': ['self'],
		'href': '../data/alerts-no-unread.json'
	}]
};

export const root1 = {
	'properties': {},
	'classes': [],
	'entities': [],
	'links': [
		{
			'rel': ['https://api.brightspace.com/rels/enrollments'],
			'href': '../enrollments.json'
		},
		{
			'rel': ['self'],
			'href': 'root1-consortium.json'
		}, {
			'rel': ['https://api.brightspace.com/rels/organization'],
			'href': '../data/consortium/organization1-consortium.json'
		}
	]
};

export const root2 = {
	'properties': {},
	'classes': [],
	'entities': [],
	'links': [
		{
			'rel': ['https://api.brightspace.com/rels/enrollments'],
			'href': '../enrollments.json'
		},
		{
			'rel': ['self'],
			'href': 'root2-consortium.json'
		}, {
			'rel': ['https://api.brightspace.com/rels/organization'],
			'href': '../data/consortium/organization2-consortium.json'
		}
	]
};
