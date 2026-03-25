import type { TransitionConfig } from 'svelte/transition';

export type Options = {
  speed: number;
  delay: number;
  onComplete?: () => void;
};

export function typewriter(
  node: HTMLElement,
  { speed = 1, delay = 0, onComplete }: Partial<Options>,
) {
  const text = node.textContent ?? '';

  if (text.length === 0) {
    onComplete?.();
    return { delay, duration: 0, tick: () => {} };
  }

  const duration = text.length / (speed * 0.01);
  let completed = false;

  return {
    delay,
    duration,
    tick: (t: number) => {
      const i = Math.trunc(text.length * t);

      node.textContent = text.slice(0, i);

      if (!completed && t === 1) {
        completed = true;
        onComplete?.();
      }
    },
  } satisfies TransitionConfig;
}
