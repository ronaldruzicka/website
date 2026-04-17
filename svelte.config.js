import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		alias: {
			'@components': './src/lib/components',
			'@features': './src/lib/features',
			'@icons': './src/lib/icons',
			'@utils': './src/lib/utils',
			'styled-system': './styled-system',
		},
		typescript: {
			config: (config) => {
				config.include.push('../styled-system');
				return config;
			},
		},
	},
};

export default config;
