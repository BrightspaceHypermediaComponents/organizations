import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangZhImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.zh = {
			'unapprovedDiscussions': '{number} 个未批准的讨论',
			'unattemptedQuizzes': '{number} 个未尝试的测验',
			'ungradedQuizzes': '{number} 个不合格的测验',
			'unreadAssignmentFeedback': '{number} 个未读作业反馈',
			'unreadAssignmentSubmissions': '{number} 个新作业提交',
			'unreadDiscussionFeedback': '{number} 个未读讨论反馈',
			'unreadDiscussions': '{number} 个未读讨论',
			'unreadQuizzesFeedback': '{number} 个未读测验反馈',
			'updates': '更新'
		};
	}
};

export const LangZh = dedupingMixin(LangZhImpl);
