import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFiImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fi = {
			'unapprovedDiscussions': '{number} Unapproved Discussions',
			'unattemptedQuizzes': '{number} Unattempted Quizzes',
			'ungradedQuizzes': '{number} Ungraded Quizzes',
			'unreadAssignmentFeedback': '{number} Unread Assignment Feedback',
			'unreadAssignmentSubmissions': '{number} Unread Assignment Submissions',
			'unreadDiscussionFeedback': '{number} Unread Discussion Feedback',
			'unreadDiscussions': '{number} Unread Discussions',
			'unreadQuizzesFeedback': '{number} Unread Quizzes Feedback',
			'updates': 'updates'
		};
	}
};

export const LangFi = dedupingMixin(LangFiImpl);
