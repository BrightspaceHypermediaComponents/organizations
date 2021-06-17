import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangEsEsImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.eses = {
			'unapprovedDiscussions': '{number} debates no aprobados',
			'unattemptedQuizzes': '{number} cuestionarios sin responder',
			'ungradedQuizzes': '{number} cuestionarios no calificados',
			'unreadAssignmentFeedback': '{number} comentarios de tarea sin leer',
			'unreadAssignmentSubmissions': '{number} nuevos envíos de tareas',
			'unreadDiscussionFeedback': '{number} comentarios de debate sin leer',
			'unreadDiscussions': '{number} debates sin leer',
			'unreadQuizzesFeedback': '{number} comentarios de cuestionario sin leer',
			'updates': 'actualizaciones'
		};
	}
};

export const LangEsEs = dedupingMixin(LangEsEsImpl);
