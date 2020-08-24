
import '../../components/d2l-organization-updates/d2l-organization-updates.js';

import { expect, fixture, html } from '@open-wc/testing';
import { runConstructor } from '@brightspace-ui/core/tools/constructor-test-helper.js';
import sinon from 'sinon/pkg/sinon-esm.js';

describe('d2l-organization-updates', () => {

	describe('constructor', () => {
		it('should construct', () => {
			runConstructor('d2l-organization-updates');
		});
	});

	let sandbox,
		component,
		notificationEntityAllFullList,
		notificationEntityList;

	beforeEach(async() => {
		sandbox = sinon.createSandbox();

		notificationEntityList = [
			{
				count: () => 20,
				type: () => 'UnreadDiscussions',
				getLink: () => '/discussions'
			},
			{
				count: () => 79,
				type: () => 'UnapprovedDiscussions',
				getLink: () => '/discussions'
			},
			{
				count: () => 1000,
				type: () => 'UnreadAssignmentFeedback',
				getLink: () => '/assignment'
			},
			{
				count: () => 200,
				type: () => 'UnreadAssignmentSubmissions',
				getLink: () => '/assignment'
			},
			{
				count: () => 4,
				type: () => 'UngradedQuizzes',
				getLink: () => '/quizzes'
			},
			{
				count: () => -20,
				type: () => 'UnattemptedQuizzes',
				getLink: () => '/quizzes'
			}
		],

		notificationEntityAllFullList = [
			{
				count: () => 20,
				type: () => 'UnreadDiscussions',
				getLink: () => '/discussions'
			},
			{
				count: () => 79,
				type: () => 'UnapprovedDiscussions',
				getLink: () => '/discussions'
			},
			{
				count: () => 40,
				type: () => 'UnreadAssignmentFeedback',
				getLink: () => '/assignment'
			},
			{
				count: () => 200,
				type: () => 'UnreadAssignmentSubmissions',
				getLink: () => '/assignment'
			},
			{
				count: () => 4,
				type: () => 'UngradedQuizzes',
				getLink: () => '/quizzes'
			},
			{
				count: () => 30,
				type: () => 'UnattemptedQuizzes',
				getLink: () => '/quizzes'
			}
		];

		component = await fixture(html`<d2l-organization-updates></d2l-organization-updates>`);
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('observers', () => {

		it('should call _getNotifications upon changes to showDropboxUnreadFeedback, showUnattemptedQuizzes, showUngradedQuizAttempts, showUnreadDiscussionMessages, showUnreadDropboxSubmissions or combined', done => {
			const spyNotification = sandbox.spy(component, '_getNotifications');
			component.showDropboxUnreadFeedback = true;
			component.showUngradedQuizAttempts = true;
			component.combined = '';
			expect(spyNotification).to.have.been.calledThrice;
			done();
		});

	});

	describe('should get notifications', () => {

		it('should set the _notifications', () => {
			expect(component._notifications).to.be.an('array');
		});

	});

	describe('Counts and icons correct.', () => {
		beforeEach(done => {
			component._notificationList = notificationEntityList;
			component.showDropboxUnreadFeedback = true;
			component.showUnattemptedQuizzes = true;
			component.showUnreadDiscussionMessages = true;
			setTimeout(() => {
				done();
			}, 100);
		});

		it('Correct Display.', () => {
			// unreadAssignmentFeedback: -20
			let notification = component.shadowRoot.querySelector('#unreadAssignmentFeedback');
			expect(notification.getAttribute('disabled')).is.null;
			expect(notification.querySelector('.update-text-icon').innerHTML).is.equal('99+');

			// UngradedQuizzes: 4
			notification = component.shadowRoot.querySelector('#unreadQuizzesFeedback');
			expect(notification.getAttribute('disabled')).is.equal('');
			expect(notification.querySelector('.update-text-icon').innerHTML).is.equal('-20');

			// UnreadDiscussions: 20
			// UnapprovedDiscussions: 79
			notification = component.shadowRoot.querySelector('#unreadDiscussionFeedback');
			expect(notification.getAttribute('disabled')).is.null;
			expect(notification.querySelector('.update-text-icon').innerHTML).is.equal('99');
		});

		it('Combined Display.', done => {
			component.combined = true;
			setTimeout(() => {
				const notification = component.shadowRoot.querySelector('.update-text-big');
				expect(notification.innerHTML).is.equal('99+');
				done();
			});

		});

	});

	describe('Counts and icons correct.', () => {
		beforeEach(done => {
			component._notificationList = notificationEntityAllFullList;
			setTimeout(() => {
				done();
			}, 100);
		});

		it('should show 3 notifications', done => {
			component.showUngradedQuizAttempts = true;
			component.showUnreadDiscussionMessages = true;
			component.showUnreadDropboxSubmissions = true;
			setTimeout(() => {
				const notifications = component.root.querySelectorAll('.organization-updates-container');
				expect(notifications.length).to.equal(3);
				done();
			});
		});

		it('should show 2 notifications', done => {
			component.showUnreadDiscussionMessages = true;
			component.showUnreadDropboxSubmissions = true;
			setTimeout(() => {
				const notifications = component.root.querySelectorAll('.organization-updates-container');
				expect(notifications.length).to.equal(2);
				done();
			});
		});

		it('should show 1 notifications', done => {
			component.showUnreadDropboxSubmissions = true;
			setTimeout(() => {
				const notifications = component.root.querySelectorAll('.organization-updates-container');
				expect(notifications.length).to.equal(1);
				done();
			});
		});

		it('should show no notifications', done => {
			setTimeout(() => {
				const notifications = component.root.querySelectorAll('.organization-updates-container');
				expect(notifications.length).to.equal(0);
				done();
			});
		});

	});

});
