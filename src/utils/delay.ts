export function delay(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    const id = setTimeout(resolve, ms);

    const onAbort = () => {
      clearTimeout(id);
      reject(new DOMException('Aborted', 'AbortError'));
    };

    signal.addEventListener('abort', onAbort, { once: true });

    // Clean up listener when timeout completes normally
    setTimeout(() => {
      signal.removeEventListener('abort', onAbort);
    }, ms);
  });
}
