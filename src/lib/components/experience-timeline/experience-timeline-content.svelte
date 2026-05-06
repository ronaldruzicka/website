<script lang="ts">
	import { css } from '@styled-system/css';

	const { duties }: { duties: string[] } = $props();
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
	{#each duties as duty, index (index)}
		<li>{duty}</li>
	{/each}
</ul>
