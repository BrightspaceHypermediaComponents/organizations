'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangNlImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.nl = {
			'unapprovedDiscussions': '{number} niet-goedgekeurde discussies',
			'unattemptedQuizzes': '{number} niet-gestarte tests',
			'ungradedQuizzes': '{number} niet-gescoorde tests',
			'unreadAssignmentFeedback': '{number} ongelezen feedbackberichten voor opdracht',
			'unreadAssignmentSubmissions': '{number} ongelezen opdrachtindieningen',
			'unreadDiscussionFeedback': '{number} ongelezen feedbackberichten voor discussie',
			'unreadDiscussions': '{number} ongelezen discussies',
			'unreadQuizzesFeedback': '{number} ongelezen feedbackberichten voor test',
			'updates': 'updates'
		};
	}
};

export const LangNl = dedupingMixin(LangNlImpl);

