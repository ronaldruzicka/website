declare module '*.css';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.webp';

declare module '*?enhanced' {
	import type { Picture } from 'vite-imagetools';

	const value: Picture;
	export default value;
}
