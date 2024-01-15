import { createItem, readItems } from '@directus/sdk';
import { client } from './client';

const colors = 'colores';

/**
 * Get the colors
 * @returns
 */
export const getColors = () => ({
	queryKey: ['colors'],
	queryFn: async () =>
		await client.request(
			readItems(colors, {
				limit: -1,
				fields: ['id', 'nombre', 'color'],
			}),
		),
});

const brands = 'marcas';

/**
 * Get the colors
 * @returns
 */
export const getBrands = () => ({
	queryKey: ['brands'],
	queryFn: async () =>
		await client.request(
			readItems(brands, {
				limit: -1,
				fields: ['id', 'nombre'],
			}),
		),
});

const clients = 'clientes';

export const createClient = async data => client.request(createItem(clients, data, { fields: ['id'] }));