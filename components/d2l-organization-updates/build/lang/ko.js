'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangKoImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.ko = {
			'unapprovedDiscussions': '{number}개의 승인되지 않은 토론',
			'unattemptedQuizzes': '{number}개의 시도되지 않은 퀴즈',
			'ungradedQuizzes': '{number}개의 평점이 없는 퀴즈',
			'unreadAssignmentFeedback': '{number}개의 읽지 않은 과제 피드백',
			'unreadAssignmentSubmissions': '{number}개 읽지 않은 과제 제출 파일',
			'unreadDiscussionFeedback': '{number}개의 읽지 않은 토론 피드백',
			'unreadDiscussions': '{number}개의 읽지 않은 토론',
			'unreadQuizzesFeedback': '{number}개의 읽지 않은 퀴즈 피드백',
			'updates': '업데이트'
		};
	}
};

export const LangKo = dedupingMixin(LangKoImpl);
