import dayjs from 'dayjs'

export function flatValue(value: any): string | null {
  if (!value) {
    // bypass undefined
    return value;
  }
  if (Array.isArray(value)) {
    // process array
    const segs = value.map((val) => +val);
    return segs.join(',');
  }
  return `${+value}`;
}

export function unflatValue(value: string | null) {
  if (!value) {
    // bypass undefined
    return value;
  }
  const segs = value.split(',');
  if (segs.length > 1) {
    // process array
    return segs.map((seg) => (seg === '0' ? null : dayjs(+seg)));
  }
}
