<script lang="ts">
  import { hstack } from 'styled-system/patterns';
  import { css } from 'styled-system/css';
  import ThemeToggle from './ThemeToggle.svelte';
</script>

<header class={hstack({ py: '$4', justifyContent: 'space-between', width: '$full' })}>
  <span
    class={css({
      fontFamily: '$mono',
      fontWeight: '$bold',
    })}
  >
    rr<span
      class={css({
        color: '$primary',
        fontSize: '$xl',
        animationName: 'pulse',
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationTimingFunction: 'ease-in-out',
        _motionReduce: {
          animationName: 'none',
        },
      })}
      >.</span
    >dev</span
  >
  <ThemeToggle />
</header>
