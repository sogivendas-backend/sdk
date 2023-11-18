/** Representa um Tipo de Pessoa */
interface PessoaTipo {
	readonly id: number;
	readonly nome: string;
	readonly documento?: string;
}

/** Pessoa do Tipo Física */
export const PESSOA_FISICA: PessoaTipo = { id: 1, nome: 'FÍSICA', documento: 'CPF' };

/** Pessoa do Tipo Jurídica */
export const PESSOA_JURIDICA: PessoaTipo = { id: 2, nome: 'JURÍDICA', documento: 'CNPJ' };

/** Tipos de Pessoas */
export const PESSOAS_TIPOS: PessoaTipo[] = [PESSOA_FISICA, PESSOA_JURIDICA];
