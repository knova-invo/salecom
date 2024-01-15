import { readItems } from '@directus/sdk';
import { client } from './client';

const services = 'servicios';

/**
 * Get services id
 * @returns
 */
export const getServices = () => ({
	queryKey: ['services'],
	queryFn: async () =>
		await client.request(
			readItems(services, {
				limit: -1,
				fields: ['id', 'nombre'],
			}),
		),
});
