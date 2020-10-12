import { first, last } from 'lodash-es';

export function map(n, in_min, in_max, out_min, out_max) {
  return ((n - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
}

export function getInitials(string) {
  const s = string
    .split(' ')
    .map(i => first(i))
    .filter(i => i);
  return first(s) + last(s);
}

export function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function splitOnce(string, on) {
  const split = string.split(on);
  return [split.shift(), split.join(on)];
}

export function shallowCompare(a, b, props = []) {
  if (!props.length) props = Object.keys(a);
  return props.every(p => a[p] === b[p]);
}
