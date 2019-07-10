'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.es = {
			'unapprovedDiscussions': '{number} debates no aprobados',
			'unattemptedQuizzes': '{number} cuestionarios sin responder',
			'ungradedQuizzes': '{number} cuestionarios no calificados',
			'unreadAssignmentFeedback': '{number} comentarios de asignación sin leer',
			'unreadAssignmentSubmissions': '{number} archivos de material enviado de asignaciones no leídas',
			'unreadDiscussionFeedback': '{number} comentarios de debate sin leer',
			'unreadDiscussions': '{number} debates sin leer',
			'unreadQuizzesFeedback': '{number} comentarios de cuestionario sin leer',
			'updates': 'actualizaciones'
		};
	}
};

export const LangEs = dedupingMixin(LangEsImpl);
