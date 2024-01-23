import { createItem, readItem, readItems } from '@directus/sdk';
import { limit } from '../utils/constants';
import { client } from './client';

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

const vehicles = 'vehiculos';

/**
 * Get all vehicles id
 * @returns
 */
export const getVehiclesIds = () => ({
	queryKey: ['vehiclesIds'],
	queryFn: async () =>
		await client.request(
			readItems(vehicles, {
				limit: -1,
				fields: ['id'],
				sort: ['-date_created'],
			}),
		),
});

/**
 * Get the vehicles id
 * @param {Number} page
 * @param {String} search
 * @returns
 */
export const getVehiclesTable = (page, search) => ({
	queryKey: ['vehiclesTable', page, search],
	queryFn: async () =>
		await client.request(
			readItems(vehicles, {
				page: page,
				limit: limit,
				fields: ['id'],
				sort: ['-date_created'],
				...(search && { search: search }),
			}),
		),
});

/**
 * Return count of vehicles
 * @param {String} search
 * @returns {Number}
 */
export const getCountVehiclesTable = search => ({
	queryKey: ['vehiclesCountTable', search],
	queryFn: async () =>
		await client.request(
			readItems(vehicles, {
				aggregate: { countDistinct: 'id' },
				...(search && { search: search }),
			}),
		),
});

/**
 * Get the client
 * @param {Number} id
 * @returns
 */
export const getVehicle = id => ({
	queryKey: ['vehicle', id],
	queryFn: async () =>
		await client.request(
			readItem(vehicles, id, {
				fields: ['modelo', 'date_created', 'color', { marca: ['nombre'] }],
			}),
		),
});

/**
 * Create a client
 * @param {*} data
 * @returns
 */
export const createVehicle = async data => client.request(createItem(vehicles, data, { fields: ['id'] }));
