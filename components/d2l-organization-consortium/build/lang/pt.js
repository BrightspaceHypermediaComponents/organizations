import { dedupingMixin } from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangPtImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.pt = {
			'errorFull': 'Opa! Não foi possível obter informações para {num} de suas guias. Tente atualizar a página',
			'errorShort': 'Opa',
			'impersonationWarning': 'Não é possível acessar outras guias durante a representação.',
			'loading': 'Em carregamento',
			'newNotifications': '{name} - Você tem novos alertas',
			'newNotificationsAlert': 'Você tem novos alertas em algumas de suas outras contas',
			'otherAccounts': 'Outras Contas'
		};
	}
};

export const LangPt = dedupingMixin(LangPtImpl);
