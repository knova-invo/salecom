import { authentication, createDirectus, readMe, rest } from '@directus/sdk';
import { HOST_ENV } from '../utils/env';
import { authStore } from '../stores/authStore';

/**
 * Client with REST support and authetication, using local storage for json
 */
export const client = createDirectus(HOST_ENV)
	.with(rest({ credentials: 'same-origin' }))
	.with(authentication('json', { storage: authStore() }));

/**
 * Log In
 * @param {String} email The email of user
 * @param {String} password The password of user
 * @returns
 */
export const signIn = async (email, password) => await client.login(email, password, { mode: 'json' });

/**
 * Log Out
 * @returns {void}
 */
export const logOut = async () => await client.logout();

/**
 * Get role of user
 * @returns
 */
export const getRole = enabled => ({
	queryKey: ['role'],
	queryFn: async () => await client.request(readMe({ fields: [{ role: ['name'] }] })),
	enabled: !!enabled,
});
