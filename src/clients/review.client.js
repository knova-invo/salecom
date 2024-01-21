import { readItem, readItems, updateItem } from '@directus/sdk';
import { limit } from '../utils/constants';
import { client } from './client';

const cases = 'casos';

/**
 * Get the cases id to review
 * @param {Number} page
 * @param {String} search
 * @returns
 */
export const getReviewsTable = (page, search) => ({
	queryKey: ['reviewsTable', page, search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				page: page,
				limit: limit,
				fields: [
					'id',
					{ vehiculo: ['id', 'modelo', { color: ['nombre'] }, { marca: ['nombre'] }] },
					{ vendedor: ['first_name', 'last_name'] },
				],
				sort: ['-date_created'],
				filter: {
					diagnostico: {
						_null: true,
					},
				},

				...(search && { search: search }),
			}),
		),
});

/**
 * Return count of cases to review
 * @param {String} search
 * @returns {Number}
 */
export const getCountReviewsTable = search => ({
	queryKey: ['reviewsCountTable', search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				aggregate: { countDistinct: 'id' },
				filter: {
					diagnostico: {
						_null: true,
					},
				},
				...(search && { search: search }),
			}),
		),
});

/**
 * Get the cases id reviewed
 * @param {Number} page
 * @param {String} search
 * @returns
 */
export const getReviewsHisTable = (page, search) => ({
	queryKey: ['reviewsHisTable', page, search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				page: page,
				limit: limit,
				fields: ['id', 'vehiculo', 'diagnostico', { vendedor: ['first_name', 'last_name'] }],
				sort: ['-diagnostico'],
				filter: {
					diagnostico: {
						_nnull: true,
					},
				},

				...(search && { search: search }),
			}),
		),
});

/**
 * Return count of cases reviews
 * @param {String} search
 * @returns {Number}
 */
export const getCountReviewsHisTable = search => ({
	queryKey: ['reviewsHisCountTable', search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				aggregate: { countDistinct: 'id' },
				filter: {
					diagnostico: {
						_nnull: true,
					},
				},
				...(search && { search: search }),
			}),
		),
});

/**
 * Get the case reviewd
 * @param {Number} id
 * @returns
 */
export const getReview = id => ({
	queryKey: ['review', id],
	queryFn: async () =>
		await client.request(
			readItem(cases, id, {
				fields: [
					{ vehiculo: ['id', 'modelo', { color: ['nombre'] }, { marca: ['nombre'] }] },
					'pago',
					'comision',
					'date_created',
					'diagnostico',
					'pago',
					{ vendedor: ['first_name', 'last_name'] },
					{ servicios: [{ servicios_id: ['nombre'] }] },
				],
			}),
		),
});

export const createReview = async (id, data) => await client.request(updateItem(cases, id, data, { fields: ['id'] }));
