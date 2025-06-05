import {
  type DateTimeFormatOptions,
  useFormatter,
} from '@stackhub/i18n/client';
import dayjs from 'dayjs';

type Options = {
  relative?: boolean;
  formatOptions?: DateTimeFormatOptions;
};

export const useFormattedDate = (
  date: Date | string,
  options: Options = {}
) => {
  const {
    relative = false,
    formatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    },
  } = options;

  const format = useFormatter();
  const now = new Date();

  const convertedDate = typeof date === 'string' ? new Date(date) : date;

  if (relative) {
    const weeksDiff = dayjs().diff(date, 'week');

    return Math.abs(weeksDiff) > 1
      ? format.dateTime(convertedDate, formatOptions)
      : format.relativeTime(convertedDate, now);
  }

  return format.dateTime(convertedDate, formatOptions);
};

export function formatDatePure(date: Date | string, locale = 'en') {
  const convertedDate = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(convertedDate);
}
