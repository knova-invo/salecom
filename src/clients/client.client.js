import { createItem, readItems } from '@directus/sdk';
import { limit } from '../utils/constants';
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

/**
 * Get all clients id
 * @returns
 */
export const getClientsIds = () => ({
	queryKey: ['clientsIds'],
	queryFn: async () =>
		await client.request(
			readItems(clients, {
				limit: -1,
				fields: ['id'],
			}),
		),
});

/**
 * Get the clients id
 * @param {Number} page
 * @param {String} search
 * @returns
 */
export const getClientsTable = (page, search) => ({
	queryKey: ['clientsTable', page, search],
	queryFn: async () =>
		await client.request(
			readItems(clients, {
				page: page,
				limit: limit,
				fields: ['id'],
				...(search && { search: search }),
			}),
		),
});

/**
 * Return count of clients
 * @param {String} search
 * @returns {Number}
 */
export const getCountClientsTable = search => ({
	queryKey: ['clientsCountTable', search],
	queryFn: async () =>
		await client.request(
			readItems(clients, {
				aggregate: { countDistinct: 'id' },
				...(search && { search: search }),
			}),
		),
});

/**
 * Create a client
 * @param {*} data
 * @returns
 */
export const createClient = async data => client.request(createItem(clients, data, { fields: ['id'] }));
