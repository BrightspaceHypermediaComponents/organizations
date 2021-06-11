
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDeImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.de = {
			'unapprovedDiscussions': '{number} nicht genehmigte Diskussionen',
			'unattemptedQuizzes': '{number} nicht beantwortete Tests',
			'ungradedQuizzes': '{number} nicht bewertete Tests',
			'unreadAssignmentFeedback': '{number} ungelesene Feedbacks zu Aufgaben',
			'unreadAssignmentSubmissions': '{number} ungelesene abgegebene Aufgabendateien',
			'unreadDiscussionFeedback': '{number} ungelesene Feedbacks zu Diskussionen',
			'unreadDiscussions': '{number} ungelesene Diskussionen',
			'unreadQuizzesFeedback': '{number} ungelesene Feedbacks zu Tests',
			'updates': 'Aktualisierungen'
		};
	}
};

export const LangDe = dedupingMixin(LangDeImpl);
