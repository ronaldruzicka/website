<script lang="ts">
	import '../app.css';
	import Container from '@components/container.svelte';
	import { vstack } from 'styled-system/patterns';

	let { children } = $props();
</script>

<svelte:head>
	<title>Developer Portfolio | system.init()</title>
	<meta name="viewport" content="width=device-width" />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link
		rel="preconnect"
		href="https://fonts.gstatic.com"
		crossorigin="anonymous"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&family=Inter:wght@400;700;900&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class={vstack({ alignItems: 'center', height: '$full', pb: '$10' })}>
	<Container>
		{@render children?.()}
	</Container>
</div>
