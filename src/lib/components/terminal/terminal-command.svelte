<script lang="ts">
  import { onDestroy } from 'svelte';
  import { css, cx } from 'styled-system/css';
  import { delay } from '$lib/utils/delay';
  import { random_delay } from '$lib/utils/random-delay';
  import { use_terminal_line } from './terminal';
  import TerminalCursor from './terminal-cursor.svelte';

  let { children } = $props();
  let template_element: HTMLSpanElement | null = null;

  let is_visible = $state(false);
  let is_cursor_active = $state(false);
  let typed_text = $state('');

  const get_original_text = () => {
    return template_element?.textContent ?? '';
  };

  const reset = () => {
    is_visible = false;
    is_cursor_active = false;
    typed_text = '';
  };

  const set_cursor_active = (value: boolean) => {
    is_cursor_active = value;
  };

  const play = async (signal: AbortSignal) => {
    is_visible = true;
    is_cursor_active = true;
    typed_text = '';

    const chars = [...get_original_text()];

    for (const char of chars) {
      typed_text += char;
      await random_delay({ min: 80, max: 160, signal });
    }

    await delay(500, signal);
    is_cursor_active = false;
  };

  const unregister_line = use_terminal_line({
    reset,
    play,
    set_cursor_active,
  });

  onDestroy(unregister_line);
</script>

<div
  class={cx(
    css({
      display: 'flex',
      gap: '$2',
      alignItems: 'center',
      opacity: 0,
      transition: 'opacity {$durations.slow} ease-out',
      _motionReduce: {
        transition: 'none',
      },
      '&.is-visible': {
        opacity: 1,
      },
    }),

    is_visible && 'is-visible',
  )}
>
  <span class={css({ color: '$primary' })}>➜</span>
  <span class={css({ display: 'none' })} aria-hidden="true" bind:this={template_element}>
    {@render children?.()}
  </span>
  <span class="terminal-content">
    {typed_text}
    {#if is_cursor_active}
      <TerminalCursor />
    {/if}
  </span>
</div>
