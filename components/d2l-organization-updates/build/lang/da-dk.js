
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangDadkImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.dadk = {
			'unapprovedDiscussions': '{number} ikke-godkendte diskussioner',
			'unattemptedQuizzes': '{number} ikke-afholdte eksaminationer',
			'ungradedQuizzes': '{number} eksaminationer uden karakter',
			'unreadAssignmentFeedback': '{number} ulæst opgavefeedback',
			'unreadAssignmentSubmissions': '{number} Ulæste opgaveafleveringsfiler',
			'unreadDiscussionFeedback': '{number} ulæst diskussionsfeedback',
			'unreadDiscussions': '{number} ulæste diskussioner',
			'unreadQuizzesFeedback': '{number} ulæst eksaminationsfeedback',
			'updates': 'opdateringer'
		};
	}
};

export const LangDadk = dedupingMixin(LangDadkImpl);
