import '@polymer/polymer/polymer-legacy.js';
import 'd2l-hypermedia-constants/d2l-hm-constants-behavior.js';
import 'd2l-icons/tier1-icons.js';
import '../d2l-organization-icons.js';
import '../d2l-organization-behavior.js';
import './localize-behavior.js';
window.D2L = window.D2L || {};
window.D2L.PolymerBehaviors = window.D2L.PolymerBehaviors || {};
window.D2L.PolymerBehaviors.Organization = window.D2L.PolymerBehaviors.Organization || {};
window.D2L.PolymerBehaviors.Organization.Updates = window.D2L.PolymerBehaviors.Organization.Updates || {};
/*
 *	Methods to get the information about organization updates.
 * @polymerBehavior D2L.PolymerBehaviors.Organization.Updates.BehaviorImpl
 */
D2L.PolymerBehaviors.Organization.Updates.BehaviorImpl = {
	__organizationUpdates: {
		notificationMap: {
			UnreadAssignmentFeedback: {
				key: 'unreadAssignmentFeedback',
				presentationLink: 'ShowDropboxUnreadFeedback',
				toolTip: 'unreadAssignmentFeedback',
				icon: 'd2l-tier1:assignments',
				order: 1
			},
			UnreadAssignmentSubmissions: {
				key: 'unreadAssignmentFeedback',
				presentationLink: 'ShowUnreadDropboxSubmissions',
				toolTip: 'unreadAssignmentSubmissions',
				icon: 'd2l-tier1:assignments',
				order: 1
			},
			UnattemptedQuizzes: {
				key: 'unreadQuizzesFeedback',
				presentationLink: 'ShowUnattemptedQuizzes',
				toolTip: 'unattemptedQuizzes',
				icon: 'd2l-organization-icons:quiz-submissions',
				order: 3
			},
			UngradedQuizzes: {
				key: 'unreadQuizzesFeedback',
				presentationLink: 'ShowUngradedQuizAttempts',
				toolTip: 'ungradedQuizzes',
				icon: 'd2l-organization-icons:quiz-submissions',
				order: 3
			},
			UnreadDiscussions: {
				key: 'unreadDiscussionFeedback',
				presentationLink: 'ShowUnreadDiscussionMessages',
				toolTip: 'unreadDiscussions',
				icon: 'd2l-tier1:comment-hollow',
				order: 2
			},
			UnapprovedDiscussions: {
				key: 'unreadDiscussionFeedback',
				presentationLink: 'ShowUnreadDiscussionMessages',
				toolTip: 'unapprovedDiscussions',
				icon: 'd2l-tier1:comment-hollow',
				order: 2
			}
		}
	},
	_orgUpdates_fetch: function(notificationsUrl, presentationUrl) {
		if (!presentationUrl) {
			return Promise.resolve();
		}

		return this._fetchSirenEntity(presentationUrl)
			.then(function(presentation) {
				return presentation.properties || {};
			}.bind(this))
			.then(function(presentation) {
				return this.__orgUpdates_fetchNotifications(notificationsUrl, presentation);
			}.bind(this));
	},
	_orgUpdates_notifications: function(notification, combined) {
		var maxCount = 99;
		if (!notification) {
			return;
		}
		if (combined) {
			notification = {
				updates: Object.keys(notification).reduce(function(accumulator, key) {
					return {
						updateCount: notification[key].updateCount + accumulator.updateCount,
						icon: null
					};
				}, { updateCount: 0 })
			};
		}

		return Object.keys(notification).map(function(key) {
			var toolTip = notification[key].toolTip
				? notification[key].toolTip.map(function(value) {
					return	 this.localize(value[0], 'number', value[1]);
				}.bind(this))
				: null;

			var element = {
				key: key,
				order: notification[key].order,
				isDisabled: (notification[key].updateCount <= 0),
				updateCount: (notification[key].updateCount > maxCount) ? maxCount + '+' : notification[key].updateCount,
				toolTip: toolTip,
				ariaLabel: this.localize(key, 'number', notification[key].updateCount),
				icon: notification[key].icon,
				link: notification[key].link
			};
			return element;
		}.bind(this)).sort(function(a, b) {
			return a.order - b.order;
		});
	},
	__orgUpdates_fetchNotifications: function(notificationsUrl, presentation) {
		if (!notificationsUrl || !presentation) {
			return Promise.resolve();
		}

		return this._fetchSirenEntity(notificationsUrl)
			.then(function(notificationsInfo) {
				if (!(notificationsInfo = notificationsInfo.getSubEntities(this.HypermediaRels.Notifications.updates))) {
					return;
				}
				var notifications = {};
				for (var i = 0; i < notificationsInfo.length; i++) {
					this.__orgUpdates_prepareNotification(notifications, presentation, notificationsInfo[i]);
				}

				return notifications;
			}.bind(this));
	},
	__orgUpdates_prepareNotification: function(notifications, presentation, updateEntity) {
		var notification = updateEntity.properties && updateEntity.properties.type;
		if (!notification && !this.__organizationUpdates.notificationMap.hasOwnProperty(notification)) {
			return;
		}

		var options = this.__organizationUpdates.notificationMap[notification];
		if (!options.key
			|| !options.presentationLink
			|| !presentation[options.presentationLink]
		) {
			return;
		}

		var currentLink = updateEntity.hasLinkByRel(this.HypermediaRels.Notifications.updatesSource)
			&& updateEntity.getLinkByRel(this.HypermediaRels.Notifications.updatesSource).href;

		if (!notifications.hasOwnProperty(options.key)) {
			notifications[options.key] = {
				icon: options.icon,
				updateCount: 0,
				order: options.order,
				toolTip: [],
				link: currentLink
			};

		} else if (notifications[options.key].link !== currentLink) {
			return;
		}

		var numberOfUpdates = updateEntity.properties.count;
		notifications[options.key].updateCount += numberOfUpdates;
		if (numberOfUpdates) {
			notifications[options.key].toolTip.push([options.toolTip, numberOfUpdates]);
		}
	},
};

/*
* @polymerBehavior D2L.PolymerBehaviors.Organization.Updates.Behavior
*/
D2L.PolymerBehaviors.Organization.Updates.Behavior = [
	window.D2L.Hypermedia.HMConstantsBehavior,
	D2L.PolymerBehaviors.Organization.Updates.LocalizeBehavior,
	D2L.PolymerBehaviors.Organization.Behavior,
	D2L.PolymerBehaviors.Organization.Updates.BehaviorImpl
];
