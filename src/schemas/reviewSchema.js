import { integer, minValue, number, object, optional, string } from 'valibot';

export const reviewSchema = object({
	comision: number('Debe ser un numero.', [
		minValue(1, 'Introduce un valor mayor a 0.'),
		integer('Debe ser un entero.'),
	]),
});
