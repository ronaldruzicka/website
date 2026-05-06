/**
 * Reactive app color mode, kept in sync with `document.documentElement.classList` (`dark`).
 * Prefer this over reading `localStorage`: the `<html>` class is what styles use, and it can
 * change from the theme toggle or other code.
 *
 * Use in components that need different markup per mode (e.g. two SVG variants):
 * `import { theme } from '$lib/theme.svelte';` then `{#if theme.is_dark}` … `{:else}` …
 */
function get_initial_is_dark(): boolean {
	if (typeof document === 'undefined') {
		return false;
	}

	return document.documentElement.classList.contains('dark');
}

export const theme = $state({
	is_dark: get_initial_is_dark(),
});

$effect.root(() => {
	$effect(() => {
		const root = document.documentElement;

		const sync_from_class = () => {
			theme.is_dark = root.classList.contains('dark');
		};

		sync_from_class();

		const observer = new MutationObserver(sync_from_class);
		observer.observe(root, {
			attributes: true,
			attributeFilter: ['class'],
		});

		return () => {
			observer.disconnect();
		};
	});
});
