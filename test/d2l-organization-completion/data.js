export const trackingDisabledProgressDisabled = {
	'class': ['course-offering'],
	'properties': {
		'name': 'Course Name',
		'code': 'SCI100',
		'startDate': '2100-01-01T00:00:00.000Z',
		'endDate': null,
		'isActive': false
	},
	'entities': [
		{
			'class': [
				'relative-uri'
			],
			'rel': [
				'item',
				'https://api.brightspace.com/rels/organization-homepage'
			],
			'properties': {
				'path': '/d2l/home/orgID'
			}
		}
	],
	'actions': [
		{
			'href': '/enable-tracking',
			'name': 'track-completion',
			'method': 'PUT',
			'fields': [
				{
					'type': 'hidden',
					'name': 'track',
					'value': true
				}
			]
		},
		{
			'href': '/enable-progress',
			'name': 'display-progress',
			'method': 'PUT',
			'fields': [
				{
					'type': 'hidden',
					'name': 'enable',
					'value': true
				}
			]
		}
	],
	'links': [
		{
			'rel':	['self'],
			'href':'/6609'
		},
		{
			'rel':['https://api.brightspace.com/rels/organization-homepage'],
			'type':'text/html',
			'href':'/d2l/home/6609'
		}
	]
};

export const trackingEnabledProgressDisabled = {
	'class': ['course-offering'],
	'properties': {
		'name': 'Course Name',
		'code': 'SCI100',
		'startDate': '2100-01-01T00:00:00.000Z',
		'endDate': null,
		'isActive': false
	},
	'actions': [
		{
			'href': '/disable-tracking',
			'name': 'do-not-track-completion',
			'method': 'PUT',
			'fields': [
				{
					'type': 'hidden',
					'name': 'track',
					'value': false
				}
			]
		},
		{
			'href': '/enable-progress',
			'name': 'display-progress',
			'method': 'PUT',
			'fields': [
				{
					'type': 'hidden',
					'name': 'enable',
					'value': true
				}
			]
		}
	],
	'links': [
		{
			'rel':	['self'],
			'href':'/6609'
		},
		{
			'rel':['https://api.brightspace.com/rels/organization-homepage'],
			'type':'text/html',
			'href':'/d2l/home/6609'
		}
	]
};

export const trackingEnabledDisplayEnabled = {
	'class': ['course-offering'],
	'properties': {
		'name': 'Course Name',
		'code': 'SCI100',
		'startDate': '2100-01-01T00:00:00.000Z',
		'endDate': null,
		'isActive': false
	},
	'actions': [
		{
			'href': '/disable-tracking',
			'name': 'do-not-track-completion',
			'method': 'PUT',
			'fields': [
				{
					'type': 'hidden',
					'name': 'track',
					'value': false
				}
			]
		},
		{
			'href': '/disable-progress',
			'name': 'do-not-display-progress',
			'method': 'PUT',
			'fields': [
				{
					'type': 'hidden',
					'name': 'enable',
					'value': false
				}
			]
		}
	],
	'links': [
		{
			'rel':	['self'],
			'href':'/6609'
		},
		{
			'rel':['https://api.brightspace.com/rels/organization-homepage'],
			'type':'text/html',
			'href':'/d2l/home/6609'
		}
	]
};

export const trackingDisabledProgressEnabled = {
	'class': ['course-offering'],
	'properties': {
		'name': 'Course Name',
		'code': 'SCI100',
		'startDate': '2100-01-01T00:00:00.000Z',
		'endDate': null,
		'isActive': false
	},
	'entities': [
		{
			'class': [
				'relative-uri'
			],
			'rel': [
				'item',
				'https://api.brightspace.com/rels/organization-homepage'
			],
			'properties': {
				'path': '/d2l/home/orgID'
			}
		}
	],
	'actions': [
		{
			'href': '/enable-tracking',
			'name': 'track-completion',
			'method': 'PUT',
			'fields': [
				{
					'type': 'hidden',
					'name': 'track',
					'value': true
				}
			]
		},
		{
			'href': '/disable-progress',
			'name': 'display-progress',
			'method': 'PUT',
			'fields': [
				{
					'type': 'hidden',
					'name': 'enable',
					'value': true
				}
			]
		}
	],
	'links': [
		{
			'rel':	['self'],
			'href':'/6609'
		},
		{
			'rel':['https://api.brightspace.com/rels/organization-homepage'],
			'type':'text/html',
			'href':'/d2l/home/6609'
		}
	]
};
