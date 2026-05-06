<script lang="ts">
	import type { ChangeEventHandler } from 'svelte/elements';

	import { theme } from '$lib/state/theme.svelte';

	import { css } from '@styled-system/css';
	import { hstack, visuallyHidden } from '@styled-system/patterns';
	import IconMoon from './icons/icon-moon.svelte';
	import IconSun from './icons/icon-sun.svelte';

	const transition_property = 'rotate, translate, opacity';
	const transition_timing_function = 'cubic-bezier(0.34, 1.56, 0.64, 1)';
	const THEME_STORAGE_KEY = 'theme';

	const handle_change: ChangeEventHandler<HTMLInputElement> = (event) => {
		const checked = event.currentTarget.checked;

		document.documentElement.classList.toggle('dark', checked);

		try {
			localStorage.setItem(THEME_STORAGE_KEY, checked ? 'dark' : 'light');
		} catch (error) {
			if (
				error instanceof DOMException &&
				error.name === 'QuotaExceededError'
			) {
				return;
			}

			throw error;
		}
	};
</script>

<label
	class={hstack({
		position: 'relative',
		alignItems: 'center',
		width: '$14',
		height: '$8',
		py: '2px',
		px: '$1',
		backgroundColor: 'oklch(from {$colors.yellow.500} 76% c 50)',
		borderRadius: '$full',
		color: '$background',
		overflow: 'clip',

		'&:has(input:focus-visible)': {
			outline: '2px solid {$colors.primary}',
			outlineOffset: '2px',
		},

		_after: {
			content: '""',
			position: 'absolute',
			top: '50%',
			left: '$0',
			width: '$6',
			height: '$6',
			borderRadius: '$full',
			backgroundColor: '{$colors.white}',
			translate: 'calc(100% + {$spacing.1}) -50%',
			transition: `translate {$durations.slower} ${transition_timing_function}`,

			_motionReduce: {
				transition: 'none',
			},
		},

		'&:has(input:checked)': {
			backgroundColor: '{$colors.slate.800}',

			_after: {
				translate: '{$spacing.1} -50%',
			},
		},
	})}
>
	<input
		class={visuallyHidden()}
		type="checkbox"
		name="theme-toggle"
		aria-label="Toggle dark mode"
		bind:checked={theme.is_dark}
		onchange={handle_change}
	/>

	<IconSun
		class={css({
			opacity: 1,
			rotate: '0deg',
			translate: '0% 0%',
			transformOrigin: 'bottom right',
			transitionProperty: transition_property,
			transitionDuration: '$slower',
			transitionTimingFunction: transition_timing_function,

			_motionReduce: {
				transition: 'none',
			},

			'input:checked~&': {
				opacity: 0,
				rotate: '-180deg',
				translate: '50% 50%',
			},
		})}
	/>

	<IconMoon
		class={css({
			color: '$neutral.300',
			opacity: 0,
			rotate: '180deg',
			translate: '50% 50%',
			transformOrigin: 'bottom left',
			transitionProperty: transition_property,
			transitionDuration: '$slower',
			transitionTimingFunction: transition_timing_function,

			_motionReduce: {
				transition: 'none',
			},

			'input:checked~&': {
				opacity: 1,
				rotate: '0deg',
				translate: '0% 0%',
			},
		})}
	/>
</label>
