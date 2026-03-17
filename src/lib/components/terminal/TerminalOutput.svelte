<script lang="ts">
  import { css, cx } from 'styled-system/css';

  let { children } = $props();
</script>

<p
  class={cx(
    'terminal-output',
    css({
      color: '$muted',
      opacity: 0,
      '&.is-visible': {
        animationName: 'slide-in-top',
        animationDuration: '$slow',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'forwards',
        _motionReduce: {
          opacity: 1,
          translate: '0',
          animationName: 'none',
        },
      },
    }),
  )}
>
  {@render children?.()}
</p>
