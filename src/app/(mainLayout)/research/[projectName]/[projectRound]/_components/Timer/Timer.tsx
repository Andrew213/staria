import dayjs, { extend } from 'dayjs';
import duration from 'dayjs/plugin/duration';

extend(duration);

interface Props {
  date: string;
}

export function Timer({ date }: Props) {
  const now = dayjs();
  const targetDate = dayjs(date);
  const duration = dayjs.duration(targetDate.diff(now));
  return <>{duration.format('D[d] H[h] m[m] s[s]')}</>;
}
