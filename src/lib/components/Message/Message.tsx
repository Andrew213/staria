import cn from 'classnames';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { AvatarGroup } from '../AvatarGroup/AvatarGroup';

dayjs.extend(relativeTime);

interface Props {
  name: string;
  id: string;
  image: string;
  text: string;
  date: string;
  seen?: boolean;
}

export function Message({ name, id, image, text, date, seen }: Props) {
  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className={cn('block size-2 rounded-full', {
              'bg-primary-300': !seen,
            })}
          ></div>
          <div>
            <AvatarGroup key={name} size="md" name={name} image={image} text={`@${id}`} />
          </div>
        </div>

        <p className="font-rubik text-sm text-gray-600">{dayjs(date).fromNow()}</p>
      </div>

      <p className="pl-5 font-rubik text-sm text-gray-600">{text}</p>
    </div>
  );
}
