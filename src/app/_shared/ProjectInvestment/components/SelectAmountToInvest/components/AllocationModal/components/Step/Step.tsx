import cn from 'classnames';

import { CheckIcon, LoadingCircle02 } from '@/assets/icons';
import { Button } from '@/lib/components';

import { data } from './constants';

interface StepProps {
  title: string;
  subtitle: string;
  isActive?: boolean;
  textBtn: string;
  isDone?: boolean;
  loading?: boolean;
}

export function Step({ textBtn, title, isActive, subtitle, isDone, loading }: StepProps) {
  // after backend integration
  // const [loading, setLoading] = useState(false);
  return (
    <div>
      <div className="flex items-center gap-5">
        {loading ? (
          <LoadingCircle02 className="size-11 animate-spin text-gray-200 dark:text-gray-blue-500" />
        ) : (
          <div
            className={cn('size-11 rounded-full p-3', isDone ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-blue-500')}
          >
            <CheckIcon className={isDone ? 'text-white' : 'text-gray-500 dark:text-gray-blue-200'} />
          </div>
        )}
        <div>
          <p className="text-md font-semibold text-gray-800 dark:text-gray-blue-25">{title}</p>
          <p className="mt-1 font-rubik text-sm text-gray-500 dark:text-gray-blue-200">{subtitle}</p>
        </div>
      </div>
      <Button
        size="md"
        className="mt-4 w-full"
        color="primary"
        loading={loading}
        disabled={!isActive || isDone}
        content={isDone ? data.textDisabledBtn : textBtn}
      />
    </div>
  );
}
