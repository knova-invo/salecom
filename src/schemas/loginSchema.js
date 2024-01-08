import { email, minLength, object, string } from 'valibot';

export const loginSchema = object({
	email: string([minLength(1, 'Por favor ingresa el correo.'), email('Ingresa un correo valido.')]),
	password: string([
		minLength(1, 'Por favor ingresa la contraseña.'),
		minLength(8, 'La contraseña debe ser de mínimo 8 caracteres.'),
	]),
});
