import { array, minLength, number, object, string } from 'valibot';

export const caseSchema = object({
	cliente: string([minLength(1, 'Por favor elegir un vehículo.')]),
	servicios: array(number(), [minLength(1, 'Por favor elegir al menos un servicio.')]),
});
