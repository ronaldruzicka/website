<script lang="ts">
	import type { BadgeVariantProps } from '@styled-system/recipes';
	import type { Snippet } from 'svelte';

	import { badge } from '@styled-system/recipes';

	type Props = BadgeVariantProps & { children: Snippet };

	const { children, color }: Props = $props();
</script>

<span class={badge({ color })}>
	{@render children()}
</span>
