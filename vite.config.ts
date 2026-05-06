import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		enhancedImages(), // must come before the SvelteKit plugin
		sveltekit(),
	],
	server: {
		fs: {
			allow: ['styled-system'],
		},
	},
});
