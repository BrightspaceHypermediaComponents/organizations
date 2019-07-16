export const consortiumRoot1 = {'class':['consortium'], 'actions':[{'href':'/consortium1.json', 'name':'consortium-tokens', 'method':'POST'}]};
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
	],
	'links': [
		{
			'rel': ['self'],
			'href': '/consortium1.json'
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
		'href': '/has-unread'
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
		'href': '/no-unread'
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

export const consortiumRoot2 = {'class':['consortium'], 'actions':[{'href':'/consortium2.json', 'name':'consortium-tokens', 'method':'POST'}]};
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
	],
	'links': [
		{
			'rel': ['self'],
			'href': '/consortium2.json'
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

export const hasUnread = {
	'properties': {
		'hasUnread': true
	},
	'links': [
		{
			'rel': ['self'],
			'href': '/hasUnread'
		}
	]
};

export const noUnread = {
	'properties': {
		'hasUnread': false
	},
	'links': [
		{
			'rel': ['self'],
			'href': '/noUnread'
		}
	]
};
