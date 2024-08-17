import moment from 'moment';

export const formatDate = (value: string, fallback = '-') =>
  moment(value).format('LLLL') ?? fallback;
