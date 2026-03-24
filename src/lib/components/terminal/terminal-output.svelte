<script lang="ts">
  import { onDestroy } from 'svelte';
  import { css, cx } from 'styled-system/css';
  import { delay } from '$lib/utils/delay';
  import { use_terminal_line } from './terminal';
  import TerminalCursor from './terminal-cursor.svelte';

  let { children } = $props();

  let is_visible = $state(false);
  let is_cursor_active = $state(false);

  const reset = () => {
    is_visible = false;
    is_cursor_active = false;
  };

  const set_cursor_active = (value: boolean) => {
    is_cursor_active = value;
  };

  const play = async (signal: AbortSignal) => {
    is_visible = true;
    await delay(400, signal);
  };

  const unregister_line = use_terminal_line({
    reset,
    play,
    set_cursor_active,
  });

  onDestroy(unregister_line);
</script>

<p
  class={cx(
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

    is_visible && 'is-visible',
  )}
>
  {@render children?.()}
  {#if is_cursor_active}
    <TerminalCursor />
  {/if}
</p>
