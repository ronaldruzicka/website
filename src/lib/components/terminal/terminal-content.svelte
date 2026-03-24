<script lang="ts">
  import { onMount } from 'svelte';
  import { css, cx } from 'styled-system/css';
  import { vstack } from 'styled-system/patterns';
  import { delay } from '$lib/utils/delay';
  import { use_terminal_content } from './terminal';

  let { children } = $props();
  const terminal = use_terminal_content();

  const reset_lines = () => {
    terminal.get_lines().forEach((line) => {
      line.set_cursor_active(false);
      line.reset();
    });
  };

  async function run_animation(signal: AbortSignal) {
    try {
      while (!signal.aborted) {
        const lines = terminal.get_lines();
        reset_lines();

        for (const line of lines) {
          await line.play(signal);
        }

        lines.at(-1)?.set_cursor_active(true);

        await delay(5000, signal);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      throw error;
    }
  }

  onMount(() => {
    const active_controller = new AbortController();

    run_animation(active_controller.signal).catch(console.error);

    return () => {
      active_controller.abort();
    };
  });
</script>

<div
  aria-live="off"
  class={cx(
    vstack({
      padding: '$6',
      width: '$full',
      alignItems: 'start',
      fontSize: '$sm',
      gap: '$3',
    }),
  )}
>
  {@render children?.()}
</div>
