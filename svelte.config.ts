import type { Config } from '@sveltejs/kit';

import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: [vitePreprocess()],
	kit: {
		adapter: adapter(),
		alias: {
			'@components': './src/lib/components',
			'@features': './src/lib/features',
			'@icons': './src/lib/icons',
			'@state': './src/lib/state',
			'@utils': './src/lib/utils',
			'@styled-system': './styled-system',
		},
		typescript: {
			config: (config) => {
				config.include.push('../styled-system');
				return config;
			},
		},
	},
} satisfies Config;

export default config;
