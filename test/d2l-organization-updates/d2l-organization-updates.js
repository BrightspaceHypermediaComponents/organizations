describe('d2l-organization-updates', () => {
	var sandbox,
		component,
		fetchStub,
		notificationEntity,
		notificationEntityAllFull,
		presentationEntity;

	function SetupFetchStub(url, entity) {
		fetchStub.withArgs(sinon.match.has('url', sinon.match(url)))
			.returns(Promise.resolve({
				ok: true,
				json: () => { return Promise.resolve(entity); }
			}));
	}

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		notificationEntity = {
			entities: [{
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 20,
					type: 'UnreadDiscussions'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnreadDiscussions',
					href: '/discussions'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 79,
					type: 'UnapprovedDiscussions'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnapprovedDiscussions',
					href: '/discussions'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 0,
					type: 'UnreadAssignmentFeedback'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnreadAssignmentFeedback',
					href: '/assignment'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 200,
					type: 'UnreadAssignmentSubmissions'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnreadAssignmentSubmissions',
					href: '/assignment'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 4,
					type: 'UngradedQuizzes'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UngradedQuizzes',
					href: '/quizzes'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: -20,
					type: 'UnattemptedQuizzes'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnattemptedQuizzes',
					href: '/quizzes'
				}]
			}],
			links: [{
				rel: ['self'],
				href: '/data/notification.json'
			}, {
				rel: ['https://api.brightspace.com/rels/organization'],
				href: 'https://98739553-44af-4933-b09c-f3798cdb13f5.organizations.api.proddev.d2l/6609'
			}]
		};
		notificationEntityAllFull = {
			entities: [{
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 20,
					type: 'UnreadDiscussions'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnreadDiscussions',
					href: '/discussions'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 79,
					type: 'UnapprovedDiscussions'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnapprovedDiscussions',
					href: '/discussions'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 40,
					type: 'UnreadAssignmentFeedback'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnreadAssignmentFeedback',
					href: '/assignment'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 200,
					type: 'UnreadAssignmentSubmissions'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnreadAssignmentSubmissions',
					href: '/assignment'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 4,
					type: 'UngradedQuizzes'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UngradedQuizzes',
					href: '/quizzes'
				}]
			}, {
				rel: ['https://notifications.api.brightspace.com/rels/updates'],
				properties: {
					count: 30,
					type: 'UnattemptedQuizzes'
				},
				links: [{
					rel: ['https://notifications.api.brightspace.com/rels/updates-source'],
					title: 'UnattemptedQuizzes',
					href: '/quizzes'
				}]
			}],
			links: [{
				rel: ['self'],
				href: '/data/notification.json'
			}, {
				rel: ['https://api.brightspace.com/rels/organization'],
				href: 'https://98739553-44af-4933-b09c-f3798cdb13f5.organizations.api.proddev.d2l/6609'
			}]
		};
		presentationEntity = {
			properties: {
				ShowCourseCode: true,
				ShowSemester: true,
				ShowUnattemptedQuizzes: true,
				ShowDropboxUnreadFeedback: true,
				ShowUngradedQuizAttempts: true,
				ShowUnreadDiscussionMessages: true,
				ShowUnreadDropboxSubmissions: true
			}
		};

		fetchStub = sandbox.stub(window.d2lfetch, 'fetch');
		SetupFetchStub('/notification.json', notificationEntity);
		SetupFetchStub('/notification-all-full.json', notificationEntityAllFull);
		SetupFetchStub('/presentation.json', presentationEntity);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('observers', () => {
		beforeEach(() => {
			component = fixture('no-params');
		});

		it('should call _fetchNotifications upon changes to href', done => {
			component.presentationHref = '';
			var spy = sandbox.spy(component, '_fetchNotifications');
			component.href = '/notification.json';
			setTimeout(() => {
				expect(spy).to.have.been.calledOnce;
				done();
			});
		});

		it('should call _fetchNotifications changes to presentation-href', done => {
			component.href = '';
			var spyNotification = sandbox.spy(component, '_fetchNotifications');

			component.presentationHref = 'presentation.json';

			setTimeout(() => {
				expect(spyNotification).to.have.been.calledOnce;
				done();
			});
		});

	});

	describe('fetching notifications', () => {
		beforeEach(done => {
			component = fixture('with-href-and-presentation-href');

			setTimeout(() => {
				done();
			}, 100);
		});

		it('should set the _notifications', () => {
			expect(component._notifications).to.be.an('array');
		});

	});

	describe('Counts and icons correct.', () => {
		beforeEach(done => {
			component = fixture('with-href-and-presentation-href');

			setTimeout(() => {
				done();
			}, 100);
		});

		it('Correct Display.', () => {
			// unreadAssignmentFeedback: -20,
			var notification = component.$$('#unreadAssignmentFeedback');
			expect(notification.getAttribute('disabled')).is.equal.false;
			expect(notification.querySelector('.update-text-icon').innerHTML).is.equal('99+');

			// UngradedQuizzes: 4
			notification = component.$$('#unreadQuizzesFeedback');
			expect(notification.getAttribute('disabled')).is.equal.true;

			// UnreadDiscussions: 20
			// UnapprovedDiscussions: 79
			notification = component.$$('#unreadDiscussionFeedback');
			expect(notification.getAttribute('disabled')).is.equal.false;
			expect(notification.querySelector('.update-text-icon').innerHTML).is.equal('99');
		});

		it('Combined Display.', done => {
			component.combined = true;
			setTimeout(() => {
				var notification = component.$$('.update-text-big');
				expect(notification.innerHTML).is.equal('99+');
				done();
			});

		});

	});

	describe('Counts and icons correct.', () => {
		beforeEach(done => {
			component = fixture('with-href-and-presentation-href-all-full');

			setTimeout(() => {
				done();
			}, 100);
		});

		function testName(testCase) {
			return 'should show ' +
				(testCase.count ? testCase.count : 'no') +
				' notifications';
		}

		[
			{
				properties: {
					ShowUnattemptedQuizzes: false,
					ShowDropboxUnreadFeedback: false,
					ShowUngradedQuizAttempts: true,
					ShowUnreadDiscussionMessages: true,
					ShowUnreadDropboxSubmissions: true,
				},
				count: 3
			},
			{
				properties: {
					ShowUnattemptedQuizzes: false,
					ShowDropboxUnreadFeedback: false,
					ShowUngradedQuizAttempts: false,
					ShowUnreadDiscussionMessages: true,
					ShowUnreadDropboxSubmissions: true,
				},
				count: 2
			},
			{
				properties: {
					ShowUnattemptedQuizzes: false,
					ShowDropboxUnreadFeedback: false,
					ShowUngradedQuizAttempts: false,
					ShowUnreadDiscussionMessages: false,
					ShowUnreadDropboxSubmissions: true,
				},
				count: 1
			},
			{
				properties: {
					ShowUnattemptedQuizzes: false,
					ShowDropboxUnreadFeedback: false,
					ShowUngradedQuizAttempts: false,
					ShowUnreadDiscussionMessages: false,
					ShowUnreadDropboxSubmissions: false,
				},
				count: 0
			}
		].forEach(testCase => {

			it(testName(testCase), done => {
				component.__orgUpdates_fetchNotifications(component.href, testCase.properties)
					.then(function(notification) {
						component._notifications = component._orgUpdates_notifications(notification);
					});

				setTimeout(() => {
					var notifications = component.root.querySelectorAll('.organization-updates-container');
					expect(notifications.length).to.equal(testCase.count);
					done();
				});

			});

		});

	});

});
