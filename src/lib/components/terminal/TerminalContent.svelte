<script lang="ts">
  import { onMount } from 'svelte';
  import { css, cx } from 'styled-system/css';
  import { vstack } from 'styled-system/patterns';
  import { delay } from '$lib/utils/delay';
  import { random_delay } from '$lib/utils/random-delay';

  let { children } = $props();
  let container: HTMLElement | null = null;

  const cursor_class = css({
    display: 'inline-block',
    width: '8px',
    height: '1.2em',
    backgroundColor: '$primary',
    marginLeft: '4px',
    verticalAlign: 'middle',
    animationName: 'pulse',
    animationDuration: '1.5s',
    animationTimingFunction: 'ease-in-out',
    animationIterationCount: 'infinite',
    _motionReduce: {
      animationName: 'none',
    },
  });

  function get_original_text(span: HTMLElement): string {
    if (!span.dataset.originalText) {
      span.dataset.originalText = span.textContent ?? '';
    }
    return span.dataset.originalText;
  }

  async function type_text(element: HTMLElement, cursor: HTMLElement, signal: AbortSignal) {
    const text = get_original_text(element);
    element.textContent = '';
    element.appendChild(cursor);

    const chars = [...text];
    for (let index = 0; index < chars.length; index++) {
      element.textContent = chars.slice(0, index + 1).join('');
      element.appendChild(cursor);
      await random_delay({ min: 80, max: 160, signal });
    }
  }

  function reset_line(line: HTMLElement) {
    line.classList.remove('is-visible');
    if (!line.classList.contains('terminal-command')) return;

    const content_span = line.querySelector<HTMLElement>('.terminal-content');
    if (!content_span) return;
    get_original_text(content_span);
    content_span.textContent = '';
  }

  async function animate_line(line: HTMLElement, cursor: HTMLElement, signal: AbortSignal) {
    line.classList.add('is-visible');

    if (line.classList.contains('terminal-command')) {
      const content_span = line.querySelector<HTMLElement>('.terminal-content');
      if (!content_span) return;
      await type_text(content_span, cursor, signal);
      await delay(500, signal);
      cursor.remove();
      return;
    }

    await delay(400, signal);
  }

  async function run_animation(lines: HTMLElement[], cursor: HTMLElement, signal: AbortSignal) {
    try {
      while (!signal.aborted) {
        lines.forEach((line) => reset_line(line));
        cursor.remove();

        for (const line of lines) {
          await animate_line(line, cursor, signal);
        }

        const last_line = lines.at(-1);
        if (last_line) {
          const last_child = last_line.lastChild;
          if (last_child?.nodeType === Node.TEXT_NODE) {
            last_child.textContent = last_child.textContent?.trimEnd() ?? '';
          }
          last_line.appendChild(cursor);
        }

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
    let active_controller: AbortController | null = null;

    async function init_terminal() {
      if (active_controller) {
        active_controller.abort();
      }
      active_controller = new AbortController();

      if (!container) return;

      const cursor_class_value = container.dataset.cursor ?? '';
      const lines = Array.from(container.children) as HTMLElement[];
      const cursor = Object.assign(document.createElement('span'), {
        className: cursor_class_value,
      });

      await run_animation(lines, cursor, active_controller.signal);
    }

    init_terminal().catch(console.error);

    return () => {
      active_controller?.abort();
    };
  });
</script>

<div
  aria-live="off"
  bind:this={container}
  class={cx(
    'terminal-container',
    vstack({
      padding: '$6',
      width: '$full',
      alignItems: 'start',
      fontSize: '$sm',
      gap: '$3',
    }),
  )}
  data-cursor={cursor_class}
>
  {@render children?.()}
</div>
