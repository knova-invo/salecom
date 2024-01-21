import { object, optional, string } from 'valibot';

export const payoutSchema = object({
	referencia: optional(string('Debe ser una referencia válida.')),
});
