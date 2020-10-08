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
			'href': '/put-track-completion.json',
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
			'href': '/put-display-progress.json',
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
			'href': '/put-do-not-track-completion',
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
			'href': '/put-display-progress.json',
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
			'href': './tracking.json',
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
			'href': './tracking.json',
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
