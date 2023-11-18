import { CNPJValueObject } from '../domain';

export type CNPJFormatado = string;
export type CNPJDesformatado = string;
export type CNPJ<T> = T extends CNPJValueObject | CNPJFormatado | CNPJDesformatado | string ? T : never;
