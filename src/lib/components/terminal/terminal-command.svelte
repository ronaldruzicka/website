<script lang="ts">
  import { onDestroy } from 'svelte';
  import { css, cx } from 'styled-system/css';
  import { delay } from '$lib/utils/delay';
  import { random_delay } from '$lib/utils/random-delay';
  import {
    use_terminal_line,
    type TerminalAnimationParams,
    type TerminalCursorParams,
    type TerminalPlayParams,
  } from './terminal';
  import TerminalCursor from './terminal-cursor.svelte';

  let { children } = $props();
  let is_visible = $state(true);
  let is_cursor_active = $state(false);
  let animations_enabled = $state(false);
  let template_text = $state('');
  let typed_text = $state('');

  const get_original_text = () => {
    return template_text;
  };

  const capture_template_text = (node: HTMLSpanElement) => {
    template_text = node.textContent ?? '';
  };

  const reset = ({ animations_enabled: next_animations_enabled }: TerminalAnimationParams) => {
    animations_enabled = next_animations_enabled;
    is_visible = !next_animations_enabled;
    is_cursor_active = false;
    typed_text = '';
  };

  const set_cursor_active = ({
    is_active,
    animations_enabled: next_animations_enabled,
  }: TerminalCursorParams) => {
    animations_enabled = next_animations_enabled;
    is_visible = true;
    is_cursor_active = next_animations_enabled ? is_active : false;
  };

  const play = async ({
    signal,
    animations_enabled: next_animations_enabled,
  }: TerminalPlayParams) => {
    animations_enabled = next_animations_enabled;
    is_visible = true;
    typed_text = '';

    if (!next_animations_enabled) {
      is_cursor_active = false;
      return;
    }

    is_cursor_active = true;

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
  data-terminal-line
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
  <span class={css({ display: 'none' })} aria-hidden="true" {@attach capture_template_text}>
    {@render children?.()}
  </span>
  <span class="terminal-content">
    {#if animations_enabled}
      {typed_text}
    {:else}
      {@render children?.()}
    {/if}
    {#if is_cursor_active}
      <TerminalCursor />
    {/if}
  </span>
</div>
