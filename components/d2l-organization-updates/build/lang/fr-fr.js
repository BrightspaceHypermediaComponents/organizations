import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'unapprovedDiscussions': '{number} discussions non approuvées',
			'unattemptedQuizzes': '{number} questionnaires sans tentative',
			'ungradedQuizzes': '{number} questionnaires non notés',
			'unreadAssignmentFeedback': '{number} réactions au devoir non lues',
			'unreadAssignmentSubmissions': '{number} nouvelles soumissions de devoirs',
			'unreadDiscussionFeedback': '{number} réactions à la discussion non lues',
			'unreadDiscussions': '{number} discussions non lues',
			'unreadQuizzesFeedback': '{number} réactions aux questionnaires non lues',
			'updates': 'mises à jour'
		};
	}
};

export const LangFrFr = dedupingMixin(LangFrFrImpl);
