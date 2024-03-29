import { any, integer, minLength, minValue, number, object, string } from 'valibot';

export const vehicleSellerSchema = object({
	id: string([minLength(1, 'Por favor ingresa la placa.')]),
	modelo: any(number('Debe ser un numero.', [integer('Debe ser un entero.')])),
	marca: number([minValue(1, 'Por favor elegir la marca.')]),
	color: string(),
});
