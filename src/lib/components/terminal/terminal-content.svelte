<script lang="ts">
	import { onMount } from 'svelte';
	import { css, cx } from 'styled-system/css';
	import { vstack } from 'styled-system/patterns';
	import { delay } from '$lib/utils/delay';
	import {
		use_terminal_content,
		type TerminalAnimationParams,
		type TerminalPlayParams,
	} from './terminal';

	let { children } = $props();
	const terminal = use_terminal_content();
	let animation_state = $state<'pending' | 'enabled' | 'disabled'>('pending');

	const reset_lines = ({ animations_enabled }: TerminalAnimationParams) => {
		terminal.get_lines().forEach((line) => {
			line.set_cursor_active({ is_active: false, animations_enabled });
			line.reset({ animations_enabled });
		});
	};

	async function run_animation({
		signal,
		animations_enabled,
	}: TerminalPlayParams) {
		try {
			while (!signal.aborted) {
				const lines = terminal.get_lines();
				reset_lines({ animations_enabled });

				for (const line of lines) {
					await line.play({ signal, animations_enabled });
				}

				lines
					.at(-1)
					?.set_cursor_active({ is_active: true, animations_enabled });

				await delay(5000, signal);
			}
		} catch (error) {
			if (error instanceof DOMException && error.name === 'AbortError') {
				return;
			}
			throw error;
		}
	}

	onMount(() => {
		const animations_enabled = !window.matchMedia(
			'(prefers-reduced-motion: reduce)',
		).matches;

		if (!animations_enabled) {
			animation_state = 'disabled';
			return;
		}

		animation_state = 'enabled';
		reset_lines({ animations_enabled: true });

		const active_controller = new AbortController();

		run_animation({
			signal: active_controller.signal,
			animations_enabled: true,
		}).catch(console.error);

		return () => {
			active_controller.abort();
		};
	});
</script>

<div
	aria-live="off"
	data-terminal-animation-state={animation_state}
	class={cx(
		vstack({
			padding: '$4',
			width: '$full',
			alignItems: 'start',
			fontSize: '$sm',
			gap: '$3',
		}),
	)}
>
	{@render children?.()}
</div>

<style>
	:global(
		html.js.motion-safe
			[data-terminal-animation-state='pending']
			[data-terminal-line]
	) {
		opacity: 0 !important;
		animation: none !important;
		transition: none !important;
	}
</style>
