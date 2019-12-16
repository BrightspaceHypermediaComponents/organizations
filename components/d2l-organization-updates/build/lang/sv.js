'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangSvImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.sv = {
			'unapprovedDiscussions': '{number} ej godkända diskussioner',
			'unattemptedQuizzes': '{number} ej gjorda förhör',
			'ungradedQuizzes': '{number} ej betygsatta förhör',
			'unreadAssignmentFeedback': '{number} oläst uppgift, feedback',
			'unreadAssignmentSubmissions': '{number} oläst uppgift, inlämningsfiler',
			'unreadDiscussionFeedback': '{number} oläst diskussion, feedback',
			'unreadDiscussions': '{number} olästa diskussioner',
			'unreadQuizzesFeedback': '{number} olästa förhör, feedback',
			'updates': 'uppdateringar'
		};
	}
};

export const LangSv = dedupingMixin(LangSvImpl);
