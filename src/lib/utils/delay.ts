export function delay(ms: number, signal: AbortSignal) {
	return new Promise<void>((resolve, reject) => {
		if (signal.aborted) {
			reject(new DOMException('Aborted', 'AbortError'));
			return;
		}

		let id: ReturnType<typeof setTimeout>;

		const on_abort = () => {
			clearTimeout(id);
			signal.removeEventListener('abort', on_abort);
			reject(new DOMException('Aborted', 'AbortError'));
		};

		signal.addEventListener('abort', on_abort, { once: true });

		id = setTimeout(() => {
			signal.removeEventListener('abort', on_abort);
			resolve();
		}, ms);
	});
}
