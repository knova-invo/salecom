/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			flexGrow: {
				2: '2',
			},
		},
		ripple: theme => ({
			colors: theme('colors'),
			modifierTransition: 'background 0.2s',
			activeTransition: 'background 0.1s',
		}),
	},
	plugins: [require('tailwindcss-ripple')()],
};
