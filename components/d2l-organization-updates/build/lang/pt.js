
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'unapprovedDiscussions': '{number} discussões não aprovadas',
			'unattemptedQuizzes': '{number} questionários sem tentativa',
			'ungradedQuizzes': '{number} questionários sem nota',
			'unreadAssignmentFeedback': '{number} comentários de atribuição não lidos',
			'unreadAssignmentSubmissions': '{number} arquivos de envio de atribuição não lidos',
			'unreadDiscussionFeedback': '{number} comentários de discussão não lidos',
			'unreadDiscussions': '{number} discussões não lidas',
			'unreadQuizzesFeedback': '{number} comentários de questionários não lidos',
			'updates': 'atualizações'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);
