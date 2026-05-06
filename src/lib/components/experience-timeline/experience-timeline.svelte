<script lang="ts">
	import { vstack } from '@styled-system/patterns';
	import ExperienceTimelineItem from './experience-timeline-item.svelte';
	import { EXPERIENCE_ENTRIES } from './experience-timeline.data';
</script>

<div
	class={vstack({
		position: 'relative',
		gap: '$20',
		borderInlineStart: '1px solid',
		borderColor: '{$colors.primary}/35',
	})}
>
	{#each EXPERIENCE_ENTRIES as entry (entry.id)}
		<ExperienceTimelineItem {entry} />
	{/each}
</div>
