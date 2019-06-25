'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrfrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.frfr = {
			'unapprovedDiscussions': '{number} discussions non approuvées',
			'unattemptedQuizzes': '{number} questionnaires sans tentative',
			'ungradedQuizzes': '{number} questionnaires non notés',
			'unreadAssignmentFeedback': '{number} réactions au devoir non lues',
			'unreadAssignmentSubmissions': '{number} Fichiers de soumission de devoirs non lues',
			'unreadDiscussionFeedback': '{number} réactions à la discussion non lues',
			'unreadDiscussions': '{number} discussions non lues',
			'unreadQuizzesFeedback': '{number} réactions aux questionnaires non lues',
			'updates': 'mises à jour'
		};
	}
};

export const LangFrfr = dedupingMixin(LangFrfrImpl);
