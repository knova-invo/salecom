/**
 * Create a local storage for auth
 */
export const authStore = () => {
	try {
		const localValue = localStorage.getItem('storage');
		let store = localValue ? JSON.parse(localValue) : null;

		return {
			get: () => store,
			set: value => {
				store = value;
				localStorage.setItem('storage', JSON.stringify(value));
			},
		};
	} catch (e) {
		console.log(e);
	}
};
