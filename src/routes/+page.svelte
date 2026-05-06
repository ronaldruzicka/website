<script lang="ts">
	import Intro from '@features/intro.svelte';
	import Projects from '@features/projects.svelte';
	import Skills from '@features/skills.svelte';
	import WorkExperience from '@features/work-experience.svelte';
	import { vstack } from '@styled-system/patterns';
</script>

<div class={vstack({ gap: '$20' })}>
	<Intro />
	<WorkExperience />
	<Projects />
	<Skills />
</div>
