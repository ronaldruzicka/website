<script lang="ts">
  import { vstack } from 'styled-system/patterns';
  import Header from './header.svelte';

  let { children } = $props();
</script>

<div class={vstack({ width: '100%', px: '$6', maxWidth: '500px', mx: 'auto', gap: '$10' })}>
  <Header />
  {@render children?.()}
</div>
