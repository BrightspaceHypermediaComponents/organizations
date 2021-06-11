import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhTwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'unapprovedDiscussions': '{number} 個未核准的討論',
			'unattemptedQuizzes': '{number} 個未嘗試的測驗',
			'ungradedQuizzes': '{number} 個未評分的測驗',
			'unreadAssignmentFeedback': '{number} 個未讀取的作業意見反應',
			'unreadAssignmentSubmissions': '{number} 個新的作業提交',
			'unreadDiscussionFeedback': '{number} 個未讀取的討論意見反應',
			'unreadDiscussions': '{number} 個未讀取的討論',
			'unreadQuizzesFeedback': '{number} 個未讀取的測驗意見反應',
			'updates': '項更新'
		};
	}
};

export const LangZhTw = dedupingMixin(LangZhTwImpl);
