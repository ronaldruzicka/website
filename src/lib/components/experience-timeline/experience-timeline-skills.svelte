<script lang="ts">
	import { flex } from 'styled-system/patterns';
	import Badge from '../badge/badge.svelte';

	const { skills }: { skills: string[] } = $props();
</script>

<ul
	class={flex({
		wrap: 'wrap',
		alignItems: 'center',
		gap: '$1.5',
		listStyle: 'none',
		margin: 0,
		padding: 0,
	})}
	aria-label="Skills used on the project"
>
	{#each skills as label, index (index)}
		<li>
			<Badge color="primary">{label}</Badge>
		</li>
	{/each}
</ul>
