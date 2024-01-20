import { createItem, readItem, readItems } from '@directus/sdk';
import { limit } from '../utils/constants';
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

const cases = 'casos';

/**
 * Get the cases id
 * @param {Number} page
 * @param {String} search
 * @returns
 */
export const getCasesTable = (page, search) => ({
	queryKey: ['casesTable', page, search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				page: page,
				limit: limit,
				fields: ['id', 'cliente', 'date_created', 'diagnostico'],
				filter: {
					pago: {
						_null: true,
					},
				},

				...(search && { search: search }),
			}),
		),
});

/**
 * Return count of cases
 * @param {String} search
 * @returns {Number}
 */
export const getCountCasesTable = search => ({
	queryKey: ['casesCountTable', search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				aggregate: { countDistinct: 'id' },
				filter: {
					pago: {
						_null: true,
					},
				},
				...(search && { search: search }),
			}),
		),
});

/**
 * Get the cases id
 * @param {Number} page
 * @param {String} search
 * @returns
 */
export const getPaymentsTable = (page, search) => ({
	queryKey: ['paymentsTable', page, search],
	queryFn: async () =>
		await client.request(
			readItems(cases, {
				page: page,
				limit: limit,
				fields: ['id', 'cliente', 'pago', 'referencia', 'comision'],
				filter: {
					pago: {
						_nnull: true,
					},
				},
				...(search && { search: search }),
			}),
		),
});

/**
 * Return count of cases
 * @param {String} search
 * @returns {Number}
 */
export const getCountPaymentsTable = search => ({
	queryKey: ['paymentsCountTable', search],
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
});

/**
 * Get the case
 * @param {Number} id
 * @returns
 */
export const getCase = id => ({
	queryKey: ['case', id],
	queryFn: async () =>
		await client.request(
			readItem(cases, id, {
				fields: [
					'cliente',
					'pago',
					'comision',
					'date_created',
					'diagnostico',
					{ servicios: [{ servicios_id: ['nombre'] }] },
				],
			}),
		),
});

/**
 * Get the payment
 * @param {Number} id
 * @returns
 */
export const getPayment = id => ({
	queryKey: ['payment', id],
	queryFn: async () =>
		await client.request(
			readItem(cases, id, { fields: ['cliente', 'pago', 'referencia', 'comision', 'date_created'] }),
		),
});

export const createCase = async data => client.request(createItem(cases, data, { fields: ['id'] }));
