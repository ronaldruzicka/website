<script lang="ts">
  import { flex } from 'styled-system/patterns';
  import Badge from '../badge/badge.svelte';

  const { stack }: { stack: string[] } = $props();
</script>

<ul
  class={flex({
    wrap: 'wrap',
    alignItems: 'center',
    gap: '$1.5',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  })}
  aria-label="Tech stack"
>
  {#each stack as label, index (index)}
    <li>
      <Badge>{label}</Badge>
    </li>
  {/each}
</ul>
