<script lang="ts">
	import { vstack } from 'styled-system/patterns';
	import Heading from '../heading.svelte';
	import { css } from 'styled-system/css';

	const {
		title,
		company,
	}: {
		title: string;
		company: string;
	} = $props();
</script>

<div class={vstack({ gap: '$0', alignItems: 'flex-start' })}>
	<Heading tag="h3">
		{company}
	</Heading>
	<p
		class={css({
			color: '$muted',
			fontFamily: '$display',
			fontSize: '$sm',
			lineHeight: '$snug',
			fontWeight: '$bold',
		})}
	>
		{title}
	</p>
</div>
