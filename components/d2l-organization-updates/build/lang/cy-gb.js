import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangCyGbImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.cygb = {
			'unapprovedDiscussions': '{number} o Drafodaethau heb eu Cymeradwyo',
			'unattemptedQuizzes': '{number} o Gwisiau heb eu Gwneud',
			'ungradedQuizzes': '{number} o Gwisiau heb eu Graddio',
			'unreadAssignmentFeedback': '{number} o Adborth ar Aseiniadau heb eu Darllen',
			'unreadAssignmentSubmissions': '{Number} o Gyflwyniadau Aseiniad Newydd',
			'unreadDiscussionFeedback': '{number} o Adborth ar Drafodaethau heb eu Darllen',
			'unreadDiscussions': '{number} o Drafodaethau heb eu Darllen',
			'unreadQuizzesFeedback': '{number} o Adborth ar Gwisiau heb eu Darllen',
			'updates': 'diweddariadau'
		};
	}
};

export const LangCyGb = dedupingMixin(LangCyGbImpl);
