export const formatNumber = (value: number, fallback = '-') =>
  value?.toLocaleString('en-US').replace(/,/g, '.') ?? fallback;

export const formatMoney = (value: number, fallback = '-') =>
  (value / 1000).toFixed(1).replace(/\.0$/, '') + 'k' ?? fallback;
