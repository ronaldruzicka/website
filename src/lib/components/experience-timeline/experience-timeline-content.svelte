<script lang="ts">
	import { css } from 'styled-system/css';

	const { highlights }: { highlights: string[] } = $props();
</script>

<ul
	class={css({
		margin: 0,
		color: '$muted',
		fontFamily: '$display',
		fontSize: '$sm',
		lineHeight: '$snug',
		display: 'flex',
		flexDirection: 'column',
		gap: '$2',
	})}
>
	{#each highlights as highlight, index (index)}
		<li>{highlight}</li>
	{/each}
</ul>
