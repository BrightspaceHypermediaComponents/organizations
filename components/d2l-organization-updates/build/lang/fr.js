import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'unapprovedDiscussions': '{number} discussions non approuvées',
			'unattemptedQuizzes': '{number} questionnaires sans tentative',
			'ungradedQuizzes': '{number} questionnaires non notés',
			'unreadAssignmentFeedback': '{number} rétroaction(s) de travail non lue(s)',
			'unreadAssignmentSubmissions': '{number} nouvelles soumissions de travail',
			'unreadDiscussionFeedback': '{number} rétroaction(s) de discussion non lue(s)',
			'unreadDiscussions': '{number} discussions non lues',
			'unreadQuizzesFeedback': '{number} rétroaction(s) de questionnaire non lue(s)',
			'updates': 'mises à jour'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);
