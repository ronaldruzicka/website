<script lang="ts">
	import type { ExperienceEntry } from './experience-timeline.types';

	import { css } from '@styled-system/css';
	import { vstack } from '@styled-system/patterns';
	import ExperienceTimelineContent from './experience-timeline-content.svelte';
	import ExperienceTimelineDate from './experience-timeline-date.svelte';
	import ExperienceTimelineMarker from './experience-timeline-marker.svelte';
	import ExperienceTimelineSkills from './experience-timeline-skills.svelte';
	import ExperienceTimelineTitle from './experience-timeline-title.svelte';

	const { entry }: { entry: ExperienceEntry } = $props();
</script>

<article
	class={css({
		position: 'relative',
		paddingInlineStart: '$6',
	})}
>
	<ExperienceTimelineMarker />

	<div
		class={vstack({
			alignItems: 'flex-start',
			gap: '$2.5',
			width: '$full',
			transformOrigin: 'bottom center',
			animation: 'item-reveal ease-in-out both',
			animationTimeline: 'view(block 0% 10%)',
			animationRange: 'entry 0% entry 200px',
		})}
	>
		<ExperienceTimelineDate date_range={entry.date_range} />
		<ExperienceTimelineTitle title={entry.job_title} company={entry.company} />
		<ExperienceTimelineContent duties={entry.duties} />

		{#if entry.skills.length}
			<ExperienceTimelineSkills skills={entry.skills} />
		{/if}
	</div>
</article>
