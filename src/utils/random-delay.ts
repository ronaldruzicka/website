import { delay } from './delay';

export function randomDelay(min: number, max: number, signal: AbortSignal) {
  return delay(min + Math.random() * (max - min), signal);
}
