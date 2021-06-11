
import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangJaImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ja = {
			'unapprovedDiscussions': '未承認のディスカッション数 {number}',
			'unattemptedQuizzes': '未試行のクイズ数 {number}',
			'ungradedQuizzes': '未評価のクイズ数 {number}',
			'unreadAssignmentFeedback': '未読の課題フィードバック数 {number}',
			'unreadAssignmentSubmissions': '未読の課題送信ファイル数 {number}',
			'unreadDiscussionFeedback': '未読のディスカッションフィードバック数 {number}',
			'unreadDiscussions': '未読のディスカッション数 {number}',
			'unreadQuizzesFeedback': '未読のクイズフィードバック数 {number}',
			'updates': '件更新'
		};
	}
};

export const LangJa = dedupingMixin(LangJaImpl);
