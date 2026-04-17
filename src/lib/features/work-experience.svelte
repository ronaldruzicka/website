<script lang="ts">
	import { hstack, vstack } from 'styled-system/patterns';

	import ExperienceTimeline from '@components/experience-timeline/experience-timeline.svelte';
	import Heading from '@components/heading.svelte';
	import { WorkHistoryIcon } from '@hugeicons/core-free-icons';
	import { HugeiconsIcon } from '@hugeicons/svelte';
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
			icon={WorkHistoryIcon}
			size={24}
			strokeWidth={1.5}
		/>
		<Heading tag="h2">Work Experience</Heading>
	</header>

	<ExperienceTimeline />
</section>
