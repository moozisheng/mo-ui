import dayjs from 'dayjs'
import { ReactNode } from 'react';

export interface IOption<V = string | number | boolean> {
  label: ReactNode;
  value: V;
}

export const defaultLocale = {
  today: '今天',
  yesterday: '昨天',
  past7Days: '过去7天',
  past15Days: '过去15天',
  past30Days: '过去30天',
  custom: '自定义',
};

export const defaultDataSource: (locale: typeof defaultLocale) => Array<IOption<any>> = (locale = defaultLocale) => {

  const todayStart = dayjs().startOf('day')
  const todayEnd = dayjs().endOf('day')

  return [
    {
      label: locale.today,
      value: [dayjs(todayStart), dayjs(todayEnd)]
    },
    {
      label: locale.yesterday,
      value: [dayjs(todayStart).subtract(1, 'day'), dayjs(todayEnd).subtract(1, 'day')],
    },
    {
      label: locale.past7Days,
      value: [dayjs(todayStart).subtract(7, 'day'), dayjs(todayEnd)],
    },
    {
      label: locale.past15Days,
      value: [dayjs(todayStart).subtract(15, 'day'), dayjs(todayEnd)],
    },
    {
      label: locale.past30Days,
      value: [dayjs(todayStart).subtract(30, 'day'), dayjs(todayEnd)],
    },
  ];
};

const normalizeValue = (val: any) => {
  if (val) {
    val = val.valueOf();
  }
  return val;
}

export const defaultOutputFormat = (value: any) => {
  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }
  return normalizeValue(value);
};
