<script lang="ts">
  import { vstack } from 'styled-system/patterns';
  import Header from './Header.svelte';

  let { children } = $props();
</script>

<div class={vstack({ width: '100vw', px: '$6', maxWidth: '500px', gap: '$10' })}>
  <Header />
  {@render children?.()}
</div>
