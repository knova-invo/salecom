import { readItem, readItems } from '@directus/sdk';
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
				fields: ['id', 'vehiculo', { vendedor: ['first_name', 'last_name'] }],
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
 * Get the case
 * @param {Number} id
 * @returns
 */
export const getReview = id => ({
	queryKey: ['review', id],
	queryFn: async () =>
		await client.request(
			readItem(cases, id, {
				fields: [
					'vehiculo',
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
