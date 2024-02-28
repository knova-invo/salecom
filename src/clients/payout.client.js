import { readItem, readItems, updateItem } from '@directus/sdk';
import { limit } from '../utils/constants';
import { client } from './client';

const cases = 'casos';

/**
 * Get the cases id to pay
 * @param {Number} page
 * @param {String} search
 * @returns
 */
export const getPayoutsTable = (page, search) => ({
	queryKey: ['payoutsTable', page, search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				page: page,
				limit: limit,
				fields: ['id', 'vehiculo', 'comision', { vendedor: ['first_name', 'last_name'] }],
				sort: ['-diagnostico'],
				filter: {
					_and: [
						{
							pago: {
								_null: true,
							},
						},
						{
							diagnostico: {
								_nnull: true,
							},
						},
					],
				},
				...(search && { search: search }),
			}),
		),
	refetchInterval: 300000,
	refetchOnWindowFocus: true,
});

/**
 * Return count of cases to pay
 * @param {String} search
 * @returns {Number}
 */
export const getCountPayoutsTable = search => ({
	queryKey: ['payoutsCountTable', search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				aggregate: { countDistinct: 'id' },
				filter: {
					_and: [
						{
							pago: {
								_null: true,
							},
						},
						{
							diagnostico: {
								_nnull: true,
							},
						},
					],
				},
				...(search && { search: search }),
			}),
		),
	refetchInterval: 300000,
	refetchOnWindowFocus: true,
});

/**
 * Get the cases id paid
 * @param {Number} page
 * @param {String} search
 * @returns
 */
export const getPayoutsHisTable = (page, search) => ({
	queryKey: ['payoutsHisTable', page, search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				page: page,
				limit: limit,
				fields: ['id', 'vehiculo', 'pago', { vendedor: ['first_name', 'last_name'] }],
				sort: ['-pago'],
				filter: {
					pago: {
						_nnull: true,
					},
				},

				...(search && { search: search }),
			}),
		),
	refetchInterval: 300000,
	refetchOnWindowFocus: true,
});

/**
 * Return count of cases paid
 * @param {String} search
 * @returns {Number}
 */
export const getCountPayoutsHisTable = search => ({
	queryKey: ['payoutsHisCountTable', search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				aggregate: { countDistinct: 'id' },
				filter: {
					pago: {
						_nnull: true,
					},
				},
				...(search && { search: search }),
			}),
		),
	refetchInterval: 300000,
	refetchOnWindowFocus: true,
});

/**
 * Get the case paid
 * @param {Number} id
 * @returns
 */
export const getPayout = id => ({
	queryKey: ['payout', id],
	queryFn: async () =>
		await client.request(
			readItem(cases, id, {
				fields: [
					'vehiculo',
					'pago',
					'comision',
					'date_created',
					'diagnostico',
					'referencia',
					'pago',
					'recibido',
					{ vendedor: ['first_name', 'last_name'] },
					{ servicios: [{ servicios_id: ['nombre'] }] },
				],
			}),
		),
});

export const createPayout = async (id, data) => await client.request(updateItem(cases, id, data, { fields: ['id'] }));
