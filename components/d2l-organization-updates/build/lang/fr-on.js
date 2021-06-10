'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrOnImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fron = {
			'unapprovedDiscussions': '{number} discussions non approuvées',
			'unattemptedQuizzes': '{number} questionnaires sans tentative',
			'ungradedQuizzes': '{number} questionnaires non notés',
			'unreadAssignmentFeedback': '{number} rétroaction(s) de tâche non lue(s)',
			'unreadAssignmentSubmissions': '{number} fichier(s) de soumission de tâche non lu(s)',
			'unreadDiscussionFeedback': '{number} rétroaction(s) de discussion non lue(s)',
			'unreadDiscussions': '{number} discussions non lues',
			'unreadQuizzesFeedback': '{number} rétroaction(s) de questionnaire non lue(s)',
			'updates': 'mises à jour'
		};
	}
};

export const LangFrOn = dedupingMixin(LangFrOnImpl);
