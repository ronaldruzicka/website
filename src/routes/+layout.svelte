<script lang="ts">
  import '../app.css';
  import Container from '$lib/components/Container.svelte';
  import { vstack } from 'styled-system/patterns';

  let { children } = $props();
</script>

<svelte:head>
  <title>Developer Portfolio | system.init()</title>
  <meta name="viewport" content="width=device-width" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="icon" href="/favicon.ico" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400&family=Space+Grotesk:wght@400;700&display=swap"
    rel="stylesheet"
  />
</svelte:head>

<div class={vstack({ alignItems: 'center', height: '$full' })}>
  <Container>
    {@render children?.()}
  </Container>
</div>
