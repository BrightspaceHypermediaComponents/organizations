'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhtwImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zhtw = {
			'unapprovedDiscussions': '{number} 個未核准討論',
			'unattemptedQuizzes': '{number} 個未嘗試測驗',
			'ungradedQuizzes': '{number} 個未評分測驗',
			'unreadAssignmentFeedback': '{number} 個未讀取的作業意見反應',
			'unreadAssignmentSubmissions': '{number} 個未讀取的作業提交',
			'unreadDiscussionFeedback': '{number} 個未讀取的討論意見反應',
			'unreadDiscussions': '{number} 個未讀取討論',
			'unreadQuizzesFeedback': '{number} 個未讀取的測驗意見反應',
			'updates': '項更新'
		};
	}
};

export const LangZhtw = dedupingMixin(LangZhtwImpl);

