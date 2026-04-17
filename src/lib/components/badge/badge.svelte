<script lang="ts">
	import { badge, type BadgeVariantProps } from 'styled-system/recipes';
	import type { Snippet } from 'svelte';

	type Props = BadgeVariantProps & { children: Snippet };

	const { children, color }: Props = $props();
</script>

<span class={badge({ color })}>
	{@render children()}
</span>
