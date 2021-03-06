import { join } from './array';

export const padLeft = (amount: number) => (value: string | number) => {
  value = String(value);
  const needsPad = amount > String(value).length;
  return (needsPad) ? new Array(amount - value.length + 1).join(' ') + value : value;
};

export const replace = (what: string | RegExp) => (withh: string) => (value: string) =>
  String(value).replace(what, withh);

export const capitalize = (text: string) => {
  const [head, ...tail] = text;
  return join('')([head.toUpperCase(), ...tail]);
};
