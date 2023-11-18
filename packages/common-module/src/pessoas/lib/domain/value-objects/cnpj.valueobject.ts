
import { ValueObject } from '@sogivendas-backend/shared';
import { CPFCNPJDocumento } from './cpf-cnpj-documento';
import { Result, Success } from '@sogivendas-backend/shared';
import { DomainError } from '@sogivendas-backend/shared';

/** Propriedades do Value Object CNPJ */
interface CNPJValueObjectProps {
	desformatado: string;
	formatado: string;
}

/**
 * Value Object do CNPJ na Aplicação
 */
export class CNPJValueObject extends ValueObject<CNPJValueObjectProps> implements CPFCNPJDocumento {


	/** CNPJ Desformatado 00000000000000 (somente números) */
	get desformatado(): string {
		return this.props.desformatado;
	}

	/** CNPJ Formatado 00.000.000/0000-00 (com pontuação) */
	get formatado(): string {
		return this.props.formatado;
	}

	private constructor(props: CNPJValueObjectProps) {
		super(props);
	}

	/** Desformata o CNPJ informado */
	private static desformatar(CNPJ: string): string {
		if (!CNPJ) {
			return '';
		}

		return CNPJ.replace(/[^a-zA-Z0-9 ]/g, '');
	}

	/** Formata o CNPJ informado */
	private static formatar(CNPJ: string): string {
		if (!CNPJ) {
			return '';
		}

		return CNPJ.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
	}

	/** Valida o CNPJ informado */
	private static isValid(CNPJ: string): boolean {
		if (CNPJ?.length != 14) {
			return false;
		}

		const r = CNPJ.split('').map((value) => parseInt(value));
		let d1 = (5 * r[0] + 4 * r[1] + 3 * r[2] + 2 * r[3] + 9 * r[4] + 8 * r[5] + 7 * r[6] + 6 * r[7] + 5 * r[8] + 4 * r[9] + 3 * r[10] + 2 * r[11]) % 11;
		let d2 =
			(6 * r[0] + 5 * r[1] + 4 * r[2] + 3 * r[3] + 2 * r[4] + 9 * r[5] + 8 * r[6] + 7 * r[7] + 6 * r[8] + 5 * r[9] + 4 * r[10] + 3 * r[11] + 2 * r[12]) %
			11;
		d1 = d1 < 2 ? 0 : 11 - d1;
		d2 = d2 < 2 ? 0 : 11 - d2;
		return d1 === r[12] && d2 === r[13] && !/^(.)\1*$/.test(CNPJ);
	}

	/** Cria um CNPJ */
	static create(CNPJ: string): Result<CNPJValueObject> {
		try {
			if (!CNPJ) {
				return DomainError.dataNotSent({ error: new Error('CNPJ não informado'), resolution: 'Informe o CNPJ e tente novamente' });
			}

			// Desformatando e validando o CNPJ
			const deformatado = this.desformatar(CNPJ);
			if (!this.isValid(deformatado)) {
				return DomainError.invalidData({
					error: new Error(`O CNPJ ${CNPJ} não é um CNPJ válido`),
					resolution: 'Verifique se você informou o CNPJ correto e tente novamente'
				});
			}

			return Success.ok(
				new CNPJValueObject({
					desformatado: deformatado,
					formatado: this.formatar(deformatado)
				})
			);
		} catch (error) {
			return DomainError.unexpected(error);
		}
	}

}
