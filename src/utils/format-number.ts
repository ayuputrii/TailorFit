import currency from 'currency.js';

export const formatNumber = (value: number, fallback = '-') =>
  value?.toLocaleString('en-US').replace(/,/g, '.') ?? fallback;

export const formatMoney = (value: number, fallback = '-') =>
  'Rp' + (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k' ?? fallback;

export function formatIdr(price: number) {
  return currency(price || 0, {symbol: 'Rp', separator: '.'})
    .format()
    .replace(/\.00$/, '');
}
