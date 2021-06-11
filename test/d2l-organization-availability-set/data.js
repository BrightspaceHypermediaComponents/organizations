export const OrganizationAvailabilitySet = {
	default: {
		'class': [
			'collection',
			'orgunit-availability-set'
		],
		'entities': [
			{
				'class': [
					'orgunit-availability',
					'explicit',
					'current'
				],
				'rel': [
					'item'
				],
				'href': '/orgUnitAvailability1.json'
			},
			{
				'class': [
					'orgunit-availability',
					'explicit'
				],
				'rel': [
					'item'
				],
				'href': '/orgUnitAvailability2.json'
			},
			{
				'class': [
					'orgunit-availability',
					'inherit'
				],
				'rel': [
					'item'
				],
				'href': '/orgUnitAvailability3.json'
			},
			{
				'class': [
					'orgunit-availability',
					'inherit'
				],
				'rel': [
					'item'
				],
				'href': '/orgUnitAvailability4.json'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/organizationAvailabilitySet.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization6606.json'
			}
		],
		'actions': [
			{
				'type': 'application/x-www-form-urlencoded',
				'title': 'Create Explicit Availability Item',
				'href': '/organizationAvailabilitySet.json',
				'name': 'create-explicit-availability-item',
				'method': 'POST',
				'fields': [
					{
						'type': 'number',
						'name': 'explicitOrgUnitId'
					}
				]
			},
			{
				'type': 'application/x-www-form-urlencoded',
				'title': 'Create Inherited Availability Item',
				'href': '/organizationAvailabilitySet.json',
				'name': 'create-inherited-availability-item',
				'method': 'POST',
				'fields': [
					{
						'type': 'number',
						'name': 'ancestorOrgUnitId'
					},
					{
						'type': 'number',
						'name': 'descendantOrgUnitTypeId'
					}
				]
			},
			{
				'type': 'application/x-www-form-urlencoded',
				'title': 'Create Current Org Unit Availability Item',
				'href': '/organizationAvailabilitySet.json',
				'name': 'create-current-orgunit-availability-item',
				'method': 'POST',
				'fields': [
					{
						'type': 'number',
						'name': 'explicitOrgUnitId',
						'value': '6606'
					}
				]
			}
		]
	},
	cannotAdd: {
		'class': [
			'collection',
			'orgunit-availability-set'
		],
		'entities': [
			{
				'class': [
					'orgunit-availability',
					'explicit',
					'current'
				],
				'rel': [
					'item'
				],
				'href': '/orgUnitAvailability1.json'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/organizationAvailabilitySetCannotAdd.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization6606.json'
			}
		]
	},
	withoutCurrentOrgUnit: {
		'class': [
			'collection',
			'orgunit-availability-set'
		],
		'entities': [
			{
				'class': [
					'orgunit-availability',
					'explicit'
				],
				'rel': [
					'item'
				],
				'href': '/orgUnitAvailability2.json'
			},
			{
				'class': [
					'orgunit-availability',
					'inherit'
				],
				'rel': [
					'item'
				],
				'href': '/orgUnitAvailability3.json'
			},
			{
				'class': [
					'orgunit-availability',
					'inherit'
				],
				'rel': [
					'item'
				],
				'href': '/orgUnitAvailability4.json'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/organizationAvailabilitySetWithoutCurrentOrgUnit.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization6606.json'
			}
		],
		'actions': [
			{
				'type': 'application/x-www-form-urlencoded',
				'title': 'Create Explicit Availability Item',
				'href': '/organizationAvailabilitySet.json',
				'name': 'create-explicit-availability-item',
				'method': 'POST',
				'fields': [
					{
						'type': 'number',
						'name': 'explicitOrgUnitId'
					}
				]
			},
			{
				'type': 'application/x-www-form-urlencoded',
				'title': 'Create Inherited Availability Item',
				'href': '/organizationAvailabilitySet.json',
				'name': 'create-inherited-availability-item',
				'method': 'POST',
				'fields': [
					{
						'type': 'number',
						'name': 'ancestorOrgUnitId'
					},
					{
						'type': 'number',
						'name': 'descendantOrgUnitTypeId'
					}
				]
			},
			{
				'type': 'application/x-www-form-urlencoded',
				'title': 'Create Current Org Unit Availability Item',
				'href': '/organizationAvailabilitySet.json',
				'name': 'create-current-orgunit-availability-item',
				'method': 'POST',
				'fields': [
					{
						'type': 'number',
						'name': 'explicitOrgUnitId',
						'value': '6606'
					}
				]
			}
		]
	},
	cannotAddAndWithoutCurrentOrgUnit: {
		'class': [
			'collection',
			'orgunit-availability-set'
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/organizationAvailabilitySetCannotAddAndMissingCurrentOrgUnit.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization6606.json'
			}
		]
	}
};

export const Organizations = {
	Org6606: {
		'class': [
			'active',
			'organization'
		],
		'properties': {
			'name': 'Dev',
			'code': null,
			'startDate': null,
			'endDate': null,
			'isActive': true,
			'description': null
		},
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/organization6606.json'
			}
		]
	},
	Org6609: {
		'class': [
			'active',
			'course-offering'
		],
		'properties': {
			'name': 'Course',
			'code': 'C1',
			'startDate': null,
			'endDate': null,
			'isActive': true,
			'description': null
		},
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/organization6609.json'
			}
		]
	},
	Org121147: {
		'class': [
			'active',
			'department'
		],
		'properties': {
			'name': 'Accounting&Financial Management',
			'code': 'AFM',
			'startDate': null,
			'endDate': null,
			'isActive': true,
			'description': null
		},
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/organization121147.json'
			}
		]
	}
};

export const OrgUnitAvailability = {
	current: {
		'class': [
			'orgunit-availability',
			'explicit',
			'current'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Organization'
				}
			}
		],
		'actions': [
			{
				'title': 'Delete Item',
				'href': '/orgUnitAvailability1.json',
				'name': 'delete-item',
				'method': 'DELETE'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/orgUnitAvailability1.json'
			},
			{
				'rel': [
					'collection'
				],
				'href': '/organizationAvailabilitySet.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization6606.json'
			}
		]
	},
	currentCannotDelete: {
		'class': [
			'orgunit-availability',
			'explicit',
			'current'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Organization'
				}
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/orgUnitAvailability5.json'
			},
			{
				'rel': [
					'collection'
				],
				'href': '/fakehref'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization6606.json'
			}
		]
	},
	explicit: {
		'class': [
			'orgunit-availability',
			'explicit'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Course Offering'
				}
			}
		],
		'actions': [
			{
				'title': 'Delete Item',
				'href': '/orgUnitAvailability2.json',
				'name': 'delete-item',
				'method': 'DELETE'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/orgUnitAvailability2.json'
			},
			{
				'rel': [
					'collection'
				],
				'href': '/organizationAvailabilitySet.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization6609.json'
			}
		]
	},
	inherit: {
		'class': [
			'orgunit-availability',
			'inherit'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Department'
				}
			}
		],
		'actions': [
			{
				'title': 'Delete Item',
				'href': '/orgUnitAvailability3.json',
				'name': 'delete-item',
				'method': 'DELETE'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/orgUnitAvailability3.json'
			},
			{
				'rel': [
					'collection'
				],
				'href': '/organizationAvailabilitySet.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization121147.json'
			}
		]
	},
	inheritWithDescendantType: {
		'class': [
			'orgunit-availability',
			'inherit'
		],
		'rel': [
			'https://api.brightspace.com/rels/cache-primer'
		],
		'entities': [
			{
				'class': [
					'descendant',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Program'
				}
			},
			{
				'class': [
					'current',
					'orgunit-type'
				],
				'rel': [
					'https://api.brightspace.com/rels/organization-type'
				],
				'properties': {
					'name': 'Department'
				}
			}
		],
		'actions': [
			{
				'title': 'Delete Item',
				'href': '/orgUnitAvailability4.json',
				'name': 'delete-item',
				'method': 'DELETE'
			}
		],
		'links': [
			{
				'rel': [
					'self'
				],
				'href': '/orgUnitAvailability4.json'
			},
			{
				'rel': [
					'collection'
				],
				'href': '/organizationAvailabilitySet.json'
			},
			{
				'rel': [
					'https://api.brightspace.com/rels/organization'
				],
				'href': '/organization121147.json'
			}
		]
	}
};
