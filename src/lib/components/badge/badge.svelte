<script lang="ts">
	import { css } from 'styled-system/css';
	import type { Snippet } from 'svelte';

	const { children }: { children: Snippet } = $props();
</script>

<span
	class={css({
		display: 'inline-flex',
		alignItems: 'center',
		px: '$2',
		py: '$1',
		fontFamily: '$mono',
		fontSize: '$xs',
		lineHeight: '$none',
		color: '$muted',
		bgColor:
			'color-mix(in oklch, {$colors.foreground}, {$colors.transparent} 94%)',
		border: '1px solid {$colors.border}',
		borderRadius: '$md',
	})}
>
	{@render children()}
</span>
