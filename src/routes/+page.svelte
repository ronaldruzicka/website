<script lang="ts">
	import Intro from '@components/about-me.svelte';
	import ExperienceTimeline from '@components/experience-timeline/experience-timeline.svelte';
	import { vstack } from 'styled-system/patterns';
</script>

<div class={vstack({ gap: '$20' })}>
	<Intro />
	<ExperienceTimeline />
</div>
