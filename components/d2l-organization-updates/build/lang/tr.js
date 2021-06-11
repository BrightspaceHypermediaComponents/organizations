
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangTrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.tr = {
			'unapprovedDiscussions': '{number} Onaylanmamış Tartışma',
			'unattemptedQuizzes': '{number} Denenmemiş Sınav',
			'ungradedQuizzes': '{number} Notlandırılmamış Sınav',
			'unreadAssignmentFeedback': '{number} Okunmamış Ödev Geri Bildirimi',
			'unreadAssignmentSubmissions': '{number} Okunmamış Ödev Gönderimi Dosyaları',
			'unreadDiscussionFeedback': '{number} Okunmamış Tartışma Geri Bildirimi',
			'unreadDiscussions': '{number} Okunmamış Tartışma',
			'unreadQuizzesFeedback': '{number} Okunmamış Sınav Geri Bildirimi',
			'updates': 'güncellemeler'
		};
	}
};

export const LangTr = dedupingMixin(LangTrImpl);
