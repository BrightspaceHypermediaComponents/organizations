'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.en = {
			'unapprovedDiscussions': '{number} Unapproved Discussions',
			'unattemptedQuizzes': '{number} Unattempted Quizzes',
			'ungradedQuizzes': '{number} Ungraded Quizzes',
			'unreadAssignmentFeedback': '{number} Unread Assignment Feedback',
			'unreadAssignmentSubmissions': '{number} New Assignment Submissions',
			'unreadDiscussionFeedback': '{number} Unread Discussion Feedback',
			'unreadDiscussions': '{number} Unread Discussions',
			'unreadQuizzesFeedback': '{number} Unread Quizzes Feedback',
			'unapprovedPortfolioEvidence': '{number} Unapproved Evidence Items',
			'updates': 'updates'
		};
	}
};

export const LangEn = dedupingMixin(LangEnImpl);
