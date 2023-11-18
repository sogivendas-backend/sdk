/**
 * Interface que declara os atributos em comuns dos documentos CPF e CNPJ
 */
export interface CPFCNPJDocumento {
	get desformatado(): string;
	get formatado(): string;
}
