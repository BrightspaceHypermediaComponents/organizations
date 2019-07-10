export const consortiumRoot = {'class':['consortium'], 'actions':[{'href':'/consortium.json', 'name':'consortium-tokens', 'method':'POST'}]};
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
				'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidGVuYW50aWQiOiIxY2IxNmQ2YS04NTU3LTQ4NTAtODg0Ni0zZmE5YjYxNzQ0OTQiLCJpYXQiOjE1MTYyMzkwMjJ9.z5hMu02Cx8p7Lw0a_1nBVTkMD2UncN5UZre3l0SWo7c'
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
				'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwidGVuYW50aWQiOiI4YjMzZTU2Ny1jNjE2LTQ2NjctODY4Yi1mZGZlOWVkYzNhNzgiLCJpYXQiOjE1MTYyMzkwMjJ9.cQjR28qT_c-os_FeFy4-L1NhCIY-9utPLzSHrzIMuOc'
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
