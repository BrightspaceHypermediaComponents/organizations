export const sequenceRoot = {
	class: [
		'sequence',
		'sequence-description'
	],
	properties: {
		title: 'LP1'
	},
	entities: [{
		class: [
			'sequence',
			'sequence-description'
		],
		properties: {
			title: 'top level module'
		},
		entities: [{
			class: [
				'sequenced-activity'
			],
			rel: [
				'item'
			],
			properties: {
				title: '20th-Century French Theatre'
			},
			entities: [{
				class: [
					'activity',
					'link-activity',
					'link-plain'
				],
				rel: [
					'about',
					'item'
				],
				properties: {
					title: '20th-Century French Theatre'
				},
				entities: [{
					class: [
						'completion',
						'incomplete'
					],
					rel: [
						'item',
						'https://api.brightspace.com/rels/completion'
					],
					links: [{
						rel: [
							'alternate'
						],
						href: '/activity/1/completion'
					}]}
				],
				actions: [{
					href: '/activity/1/view-activity',
					name: 'view-activity',
					method: 'POST'
				}, {
					href: '/activity/1/view-activity-duration',
					name: 'view-activity-duration',
					method: 'PUT'
				}, {
					href: '/activity/1/set-last-viewed-content-object',
					name: 'set-last-viewed-content-object',
					method: 'POST'
				}],
				links: [{
					rel: [
						'about'
					],
					href: '/about/activity/1'
				}, {
					class: [
						'view'
					],
					rel: [
						'alternate'
					],
					href: '/view/activity/1'
				}, {
					rel: [
						'https://api.brightspace.com/rels/organization',
						'alternate'
					],
					href: '/organizations/1'
				}]}
			],
			links: [{
				rel: [
					'self',
					'describes'
				],
				href: '/activity/1'
			}, {
				rel: [
					'https://api.brightspace.com/rels/organization'
				],
				href: '../data/learningPath/organization-learning-path.json'
			}, {
				rel: [
					'next'
				],
				href: '/activity/2'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/default-return-url'
				],
				type: 'text/html',
				href: '/activity/1/homepage'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/sequence-viewer-application'
				],
				type: 'text/html',
				href: '/activity/1/sequence-viewer-application'
			}, {
				rel: [
					'alternate'
				],
				type: 'text/html',
				href: '/organization/1/homepage'
			}, {
				rel: [
					'up'
				],
				href: '/sequence/1'
			}]
		}, {
			class: [
				'sequenced-activity'
			],
			rel: [
				'item'
			],
			properties: {
				title: 'Accounting 1200-01'
			},
			entities: [{
				class: [
					'activity',
					'link-activity',
					'link-plain'
				],
				rel: [
					'about',
					'item'
				],
				properties: {
					title: 'Accounting 1200-01'
				},
				entities: [{
					class: [
						'completion',
						'incomplete'
					],
					rel: [
						'item',
						'https://api.brightspace.com/rels/completion'
					],
					links: [{
						rel: [
							'alternate'
						],
						href: '/activity/2/completion'
					}]
				}],
				actions: [{
					href: '/activity/2/view-activity',
					name: 'view-activity',
					method: 'POST'
				}, {
					href: '/activity/2/view-activity-duration',
					name: 'view-activity-duration',
					method: 'PUT'
				}, {
					href: '/activity/2/set-last-viewed-content-object',
					name: 'set-last-viewed-content-object',
					method: 'POST'
				}],
				links: [{
					rel: [
						'about'
					],
					href: '/activity/2/about'
				}, {
					class: [
						'view'
					],
					rel: [
						'alternate'
					],
					href: '/activity/2/View'
				}, {
					rel: [
						'https://api.brightspace.com/rels/organization',
						'alternate'
					],
					href: '/organizations/2'
				}]
			}],
			links: [{
				rel: [
					'self',
					'describes'
				],
				href: '/activity/2'
			}, {
				rel: [
					'https://api.brightspace.com/rels/organization'
				],
				href: '../data/learningPath/organization-learning-path.json'
			}, {
				rel: [
					'prev'
				],
				href: '/activity/1'
			}, {
				rel: [
					'next'
				],
				href: '/activity/3'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/default-return-url'
				],
				type: 'text/html',
				href: '/activity/2/default-return-url'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/sequence-viewer-application'
				],
				type: 'text/html',
				href: '/activity/2/sequence-viewer-application'
			}, {
				rel: [
					'alternate'
				],
				type: 'text/html',
				href: '/activity/2/View'
			}, {
				rel: [
					'up'
				],
				href: '/sequence/1'
			}]
		}, {
			class: [
				'sequenced-activity'
			],
			rel: [
				'item'
			],
			properties: {
				title: '20th-Century French Theatre'
			},
			entities: [{
				class: [
					'activity',
					'link-activity',
					'link-plain'
				],
				rel: [
					'about',
					'item'
				],
				properties: {
					title: '20th-Century French Theatre'
				},
				entities: [{
					class: [
						'completion',
						'incomplete'
					],
					rel: [
						'item',
						'https://api.brightspace.com/rels/completion'
					],
					links: [{
						rel: [
							'alternate'
						],
						href: '/activity/3/completion'
					}]
				}],
				actions: [{
					href: '/activity/3/view-activity',
					name: 'view-activity',
					method: 'POST'
				}, {
					href: '/activity/3/view-activity-duration',
					name: 'view-activity-duration',
					method: 'PUT'
				}, {
					href: '/activity/3/set-last-viewed-content-object',
					name: 'set-last-viewed-content-object',
					method: 'POST'
				}],
				links: [{
					rel: [
						'about'
					],
					href: '/about/activity/3'
				}, {
					class: [
						'view'
					],
					rel: [
						'alternate'
					],
					href: '/view/activity/3'
				}, {
					rel: [
						'https://api.brightspace.com/rels/organization',
						'alternate'
					],
					href: '/organizations/3'
				}]
			}],
			links: [{
				rel: [
					'self',
					'describes'
				],
				href: '/activity/3'
			}, {
				rel: [
					'https://api.brightspace.com/rels/organization'
				],
				href: '/learningPaths/1'
			}, {
				rel: [
					'prev'
				],
				href: '/activity/2'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/default-return-url'
				],
				type: 'text/html',
				href: '/activity/3/homepage'
			}, {
				rel: [
					'https://sequences.api.brightspace.com/rels/sequence-viewer-application'
				],
				type: 'text/html',
				href: '/activity/3/sequence-viewer-application'
			}, {
				rel: [
					'alternate'
				],
				type: 'text/html',
				href: '/organization/3/homepage'
			}, {
				rel: [
					'up'
				],
				href: '/sequence/1'
			}]
		}],
		links: [{
			rel: [
				'self',
				'describes'
			],
			href: '/sequence/1'
		}, {
			rel: [
				'https://api.brightspace.com/rels/organization'
			],
			href: '../data/learningPath/organization-learning-path.json'
		}, {
			rel: [
				'https://sequences.api.brightspace.com/rels/default-return-url'
			],
			type: 'text/html',
			href: '/learningpath/1/homepage'
		}, {
			rel: [
				'https://sequences.api.brightspace.com/rels/sequence-viewer-application'
			],
			type: 'text/html',
			href: '/learningpath/1/sequence-viewer-application'
		}, {
			rel: [
				'alternate'
			],
			type: 'text/html',
			href: '/learningpath/1/homepage'
		}, {
			rel: [
				'up'
			],
			href: '/sequenceRoot'
		}],
		rel: [
			'item'
		]
	}],
	links: [{
		rel: [
			'self',
			'describes'
		],
		href: '/sequenceRoot'
	}]
};

export const organization1Entity = {
	class: [ 'course-offering' ],
	properties: {
		name: 'Course Name',
		code: 'SCI100',
		startDate: null,
		endDate: null,
		isActive: false
	},
	entities:[{
		class:['course-image'],
		rel:['https://api.brightspace.com/rels/organization-image'],
		href:'/image/1'
	}],
	links: [{
		rel:['self'],
		href:'/organizations/1'
	}]
};
export const organization2Entity = {
	class: [ 'course-offering' ],
	properties: {
		name: 'Course Name',
		code: 'SCI100',
		startDate: null,
		endDate: null,
		isActive: false
	},
	entities:[{
		class:['course-image'],
		rel:['https://api.brightspace.com/rels/organization-image'],
		href:'/image/2'
	}],
	links: [{
		rel:['self'],
		href:'/organizations/2'
	}]
};
export const organization3Entity = {
	class: [ 'course-offering' ],
	properties: {
		name: 'Course Name',
		code: 'SCI100',
		startDate: null,
		endDate: null,
		isActive: false
	},
	entities:[{
		class:['course-image'],
		rel:['https://api.brightspace.com/rels/organization-image'],
		href:'/image/3'
	}],
	links: [{
		rel:['self'],
		href:'/organizations/3'
	}]
};

export const learningPathEntity = {
	class: [ 'learning-path' ],
	properties: {
		name: 'LearningPath',
		code: 'SCI100',
		startDate: null,
		endDate: null,
		isActive: false
	},
	links: [{
		rel:['self'],
		href:'/learningPaths/1'
	}, {
		href: '/sequenceRoot',
		rel: ['https://api.brightspace.com/rels/sequence']
	}]
};

export const image1Entity = {
	rel: ['https://api.brightspace.com/rels/organization-image'],
	class: ['course-image'],
	properties: {
		name: '1.jpg',
		type: 'image/jpeg'
	},
	links: [{
		rel: ['self'],
		href: '/image/1'
	}, {
		rel: ['alternate'],
		class: ['tile', 'low-density', 'max'],
		href: 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
	}]
};

export const image2Entity = {
	rel: ['https://api.brightspace.com/rels/organization-image'],
	class: ['course-image'],
	properties: {
		name: '2.jpg',
		type: 'image/jpeg'
	},
	links: [{
		rel: ['self'],
		href: '/image/2'
	}, {
		rel: ['alternate'],
		class: ['tile', 'low-density', 'max'],
		href: 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
	}]
};

export const image3Entity = {
	rel: ['https://api.brightspace.com/rels/organization-image'],
	class: ['course-image'],
	properties: {
		name: '3.jpg',
		type: 'image/jpeg'
	},
	links: [{
		rel: ['self'],
		href: '/image/3'
	}, {
		rel: ['alternate'],
		class: ['tile', 'low-density', 'max'],
		href: 'https://s.brightspace.com/course-images/images/b53fc2ae-0de4-41da-85ff-875372daeacc/tile-low-density-max-size.jpg',
	}]
};
