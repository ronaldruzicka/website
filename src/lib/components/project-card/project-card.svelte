<script lang="ts">
	import Badge from '@components/badge/badge.svelte';
	import Heading from '@components/heading.svelte';
	import IconButton from '@components/icon-button/icon-button.svelte';
	import { GithubIcon, Link05Icon } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
	import { css } from 'styled-system/css';
	import { hstack, vstack } from 'styled-system/patterns';
	import type { Project } from './projects-data';

	const { project }: { project: Project } = $props();
</script>

<div
	class={css({
		bgColor: '$foreground',
		borderRadius: '$2xl',
		overflow: 'clip',
		transformOrigin: 'center center',
		animation: 'project-reveal linear both',
		animationTimeline: 'view(block 0% 15%)',
		animationRange: 'entry 0% entry 200px',
	})}
>
	<header>
		<enhanced:img
			src={project.image}
			alt={project.name}
			class={css({ objectFit: 'cover' })}
		/>
	</header>
	<div
		class={vstack({
			padding: '$8',
			pb: 0,
			gap: '$4',
			alignItems: 'flex-start',
		})}
	>
		<div class={hstack({ flexWrap: 'wrap', gap: '$1.5' })}>
			{#each project.skills as skill, i (`${skill}-${i}`)}
				<Badge color="primary">{skill}</Badge>
			{/each}
		</div>
		<Heading tag="h3">{project.name}</Heading>
		<p class={css({ color: '$muted' })}>{project.description}</p>
	</div>
	<footer class={hstack({ gap: '$4', alignItems: 'center', padding: '$8' })}>
		<IconButton href={project.url} target="_blank" aria-label="View project"
			><HugeiconsIcon icon={Link05Icon} size={20} /></IconButton
		>
		<IconButton
			href={project.github_url}
			target="_blank"
			aria-label="View GitHub repository"
			><HugeiconsIcon icon={GithubIcon} size={20} /></IconButton
		>
	</footer>
</div>
