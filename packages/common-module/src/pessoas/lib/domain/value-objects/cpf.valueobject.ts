
// import { ValueObject } from '@sogivendas-backend/shared/domain';
// import { CPFCNPJDocumento } from './cpf-cnpj-documento';

// import { DomainError } from '@sogivendas-backend/shared/errors';
// import { Result, Success } from '@sogivendas-backend/shared/result';

// /** Propriedades do Value Object CPF */
// interface CPFValueObjectProps {
// 	desformatado: string;
// 	formatado: string;
// }

// /**
//  * Value Object do CPF na Aplicação
//  */
// export class CPFValueObject extends ValueObject<CPFValueObjectProps> implements CPFCNPJDocumento {


// 	/** CPF Desformatado 00000000000 (somente números) */
// 	get desformatado(): string {
// 		return this.props.desformatado;
// 	}

// 	/** CPF Formatado 000.000.000-00 (com pontuação) */
// 	get formatado(): string {
// 		return this.props.formatado;
// 	}

// 	private constructor(props: CPFValueObjectProps) {
// 		super(props);
// 	}

// 	/** Desformata o CPF informado */
// 	private static desformatar(CPF: string): string {
// 		if (!CPF) {
// 			return '';
// 		}

// 		return CPF.replace(/[^a-zA-Z0-9 ]/g, '');
// 	}

// 	/** Formata o CPF informado */
// 	private static formatar(CPF: string): string {
// 		if (!CPF) {
// 			return '';
// 		}

// 		return CPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
// 	}

// 	/** Valida o CPF informado */
// 	private static isValid(CPF: string): boolean {
// 		if (CPF.length != 11) {
// 			return false;
// 		}

// 		const r = CPF.split('').map((value) => parseInt(value));
// 		let d1 = (10 * r[0] + 9 * r[1] + 8 * r[2] + 7 * r[3] + 6 * r[4] + 5 * r[5] + 4 * r[6] + 3 * r[7] + 2 * r[8]) % 11;
// 		let d2 = (11 * r[0] + 10 * r[1] + 9 * r[2] + 8 * r[3] + 7 * r[4] + 6 * r[5] + 5 * r[6] + 4 * r[7] + 3 * r[8] + 2 * r[9]) % 11;
// 		d1 = d1 < 2 ? 0 : 11 - d1;
// 		d2 = d2 < 2 ? 0 : 11 - d2;
// 		return d1 === r[9] && d2 === r[10] && !/^(.)\1*$/.test(CPF);
// 	}

// 	/** Cria um CPF */
// 	static create(CPF: string): Result<CPFValueObject> {
// 		try {
// 			if (!CPF) {
// 				return DomainError.dataNotSent({ error: new Error('CPF não informado'), resolution: 'Informe o CPF e tente novamente' });
// 			}

// 			// Desformatando e validando o CPF
// 			const deformatado = this.desformatar(CPF);
// 			if (!this.isValid(deformatado)) {
// 				return DomainError.invalidData({
// 					error: new Error(`O CPF ${CPF} não é um CPF válido`),
// 					resolution: 'Verifique se você informou o CPF correto e tente novamente'
// 				});
// 			}

// 			return Success.ok(
// 				new CPFValueObject({
// 					desformatado: deformatado,
// 					formatado: this.formatar(deformatado)
// 				})
// 			);
// 		} catch (error) {
// 			return DomainError.unexpected(error);
// 		}
// 	}

// }
