import { delay } from './delay';

type Params = {
  min: number;
  max: number;
  signal: AbortSignal;
};

export function randomDelay({ min, max, signal }: Params) {
  if (!Number.isFinite(min) || !Number.isFinite(max) || min < 0 || max < 0 || min > max) {
    throw new RangeError('min/max must be finite, non-negative, and min <= max');
  }

  return delay(min + Math.random() * (max - min), signal);
}
