<script lang="ts">
	import type {
		TerminalAnimationParams,
		TerminalCursorParams,
		TerminalPlayParams,
	} from './terminal';

	import { onDestroy } from 'svelte';

	import { delay } from '@utils/delay';
	import { css, cx } from '@styled-system/css';
	import { use_terminal_line } from './terminal';
	import TerminalCursor from './terminal-cursor.svelte';

	let { children } = $props();

	let is_visible = $state(true);
	let is_cursor_active = $state(false);

	const reset = ({
		animations_enabled: next_animations_enabled,
	}: TerminalAnimationParams) => {
		is_visible = !next_animations_enabled;
		is_cursor_active = false;
	};

	const set_cursor_active = ({
		is_active,
		animations_enabled: next_animations_enabled,
	}: TerminalCursorParams) => {
		is_visible = true;
		is_cursor_active = next_animations_enabled ? is_active : false;
	};

	const play = async ({
		signal,
		animations_enabled: next_animations_enabled,
	}: TerminalPlayParams) => {
		is_visible = true;
		is_cursor_active = false;

		if (!next_animations_enabled) {
			return;
		}

		await delay(400, signal);
	};

	const unregister_line = use_terminal_line({
		reset,
		play,
		set_cursor_active,
	});

	onDestroy(unregister_line);
</script>

<p
	data-terminal-line
	class={cx(
		css({
			color: '$muted',
			opacity: 0,

			'&.is-visible': {
				animationName: 'slide-in-top',
				animationDuration: '$slow',
				animationTimingFunction: 'ease-out',
				animationFillMode: 'forwards',
				_motionReduce: {
					opacity: 1,
					translate: '0',
					animationName: 'none',
				},
			},
		}),

		is_visible && 'is-visible',
	)}
>
	{@render children?.()}
	{#if is_cursor_active}
		<TerminalCursor />
	{/if}
</p>
