import { email, nullish, object, optional, string } from 'valibot';

export const clientSellerSchema = object({
	id: string([]),
	modelo: string([]),
});
