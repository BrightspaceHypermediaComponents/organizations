import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangArImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ar = {
			'unapprovedDiscussions': '{number} من المناقشات غير الموافَق عليها',
			'unattemptedQuizzes': '{number} من الاختبارات التي لم تتم أي محاولة لإجرائها',
			'ungradedQuizzes': '{number} من الاختبارات التي لم توضَع علامة عليها',
			'unreadAssignmentFeedback': '{number} من ملاحظات الفرض غير المقروءة',
			'unreadAssignmentSubmissions': '{number} من إرسالات الفروض الجديدة',
			'unreadDiscussionFeedback': '{number} من ملاحظات المناقشة غير المقروءة',
			'unreadDiscussions': '{number} من المناقشات غير المقروءة',
			'unreadQuizzesFeedback': '{number} من ملاحظات الاختبارات غير المقروءة',
			'updates': 'من التحديثات'
		};
	}
};

export const LangAr = dedupingMixin(LangArImpl);
