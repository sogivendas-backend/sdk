// import { DomainError, Failure, Result, Success, ValueObject } from '@sogivendas-backend/shared';
// import { CNPJValueObject } from './cnpj.valueobject';
// import { CPFCNPJDocumento } from './cpf-cnpj-documento';
// import { CPFValueObject } from './cpf.valueobject';

// /** Propriedades do Value Object de um Documento CPF/CNPJ */
// interface CPFCNPJValueObjectProps {
// 	documento: CPFCNPJDocumento;
// 	isCPF?: boolean;
// 	isCNPJ?: boolean;
// }

// /**
//  * Value Object de um Documento CPF/CNPJ na Aplicação
//  */
// export class CPFCNPJValueObject extends ValueObject<CPFCNPJValueObjectProps> {


// 	/** CPF/CNPJ Desformatado 00000000000 / 00000000000000  (somente números) */
// 	get desformatado(): string {
// 		return this.props.documento.desformatado;
// 	}

// 	/** CPF/CNPJ Formatado 000.000.000-00 / 00.000.000/0000-00 (com pontuação) */
// 	get formatado(): string {
// 		return this.props.documento.formatado;
// 	}

// 	/** Retorna se o Documento é um CPF */
// 	get isCPF(): boolean {
// 		return this.props.isCPF ?? false;
// 	}

// 	/** Retorna se o Documento é um CNPJ */
// 	get isCNPJ(): boolean {
// 		return this.props.isCNPJ ?? false;
// 	}

// 	private constructor(props: CPFCNPJValueObjectProps) {
// 		super(props);
// 	}

// 	/** Desformata o valor do documento informado */
// 	private static desformatar(doc: string): string {
// 		if (!doc) {
// 			return '';
// 		}

// 		return doc.replace(/[^a-zA-Z0-9 ]/g, '');
// 	}

// 	/** Verifica se o documento informado é um CPF */
// 	private static isDocumentoCPF(doc: string): boolean {
// 		const docDesformatado = this.desformatar(doc);
// 		return /^\d{11}$/.test(docDesformatado);
// 	}

// 	/** Verifica se o documento informado é um CNPJ */
// 	private static isDocumentoCNPJ(doc: string): boolean {
// 		const docDesformatado = this.desformatar(doc);
// 		return /^\d{14}$/.test(docDesformatado);
// 	}

// 	/** Cria um CPF ou CNPJ com base no documento informado */
// 	static create(doc: string): Result<CPFCNPJValueObject> {
// 		try {
// 			if (!doc) {
// 				return DomainError.dataNotSent({ error: new Error('CPF/CNPJ não informado'), resolution: 'Informe o CPF/CNPJ e tente novamente' });
// 			}

// 			// CPF
// 			if (this.isDocumentoCPF(doc)) {
// 				const cpfResult = CPFValueObject.create(doc);
// 				if (cpfResult.isFailure()) {
// 					return Failure.wrap(cpfResult);
// 				}

// 				return Success.ok(
// 					new CPFCNPJValueObject({
// 						documento: cpfResult.data,
// 						isCPF: true
// 					})
// 				);
// 			}

// 			// CNPJ
// 			if (this.isDocumentoCNPJ(doc)) {
// 				const cnpjResult = CNPJValueObject.create(doc);
// 				if (cnpjResult.isFailure()) {
// 					return Failure.wrap(cnpjResult);
// 				}

// 				return Success.ok(
// 					new CPFCNPJValueObject({
// 						documento: cnpjResult.data,
// 						isCNPJ: true
// 					})
// 				);
// 			}

// 			return DomainError.invalidData({
// 				error: new Error(`Documento Inválido! O Documento informado ${doc} não é um CPF e nem um CNPJ válido`),
// 				resolution: 'Verifique se você informou o CNPJ/CPF correto e tente novamente'
// 			});
// 		} catch (error) {
// 			return DomainError.unexpected(error);
// 		}
// 	}

// }
