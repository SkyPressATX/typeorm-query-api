import { trim } from 'lodash';

export function explode(
  x?: string | number,
  separator = ',',
): string[] | number[] | undefined {
  if (!x) return undefined;
  if (typeof x !== 'string') return [x];
  return x.split(separator).map((x) => trim(x));
  // .map((x) => escape(x)); // .map((x) => escape(x)); // Why was I doing this?
}
