import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import { compression } from 'vite-plugin-compression2';

export default defineConfig({
	plugins: [solid(), compression()],
});
