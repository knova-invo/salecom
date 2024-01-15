import { array, email, minLength, number, object } from 'valibot';

export const caseSchema = object({
	cliente: number([minValue(1, 'Por favor elegir un cliente.')]),
	servicios: array(number(), minLength(1, 'Por favor elegir al menos un servicio.')),
});
