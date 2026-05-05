<script lang="ts">
	import Heading from '@components/heading.svelte';
	import ProjectCard from '@components/project-card/project-card.svelte';
	import { PROJECTS } from '@components/project-card/projects-data';
	import { Idea01Icon } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { grid, hstack, vstack } from 'styled-system/patterns';
</script>

<section class={vstack({ width: '$full', gap: '$8' })}>
	<header
		class={hstack({
			gap: '$2',
			alignItems: 'center',
			width: '$full',
		})}
	>
		<HugeiconsIcon
			aria-hidden="true"
			color="currentColor"
			icon={Idea01Icon}
			size={24}
			strokeWidth={1.5}
		/>
		<Heading tag="h2">Projects</Heading>
	</header>

	<div
		class={grid({
			columns: 1,
			gap: '$4',
			md: { columns: 2, gap: '$6' },
			lg: { columns: 3, gap: '$8' },
		})}
	>
		{#each PROJECTS as project}
			<ProjectCard {project} />
		{/each}
	</div>
</section>
