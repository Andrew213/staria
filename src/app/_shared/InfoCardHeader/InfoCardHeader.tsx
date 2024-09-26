import { twJoin, twMerge } from 'tailwind-merge';

import { Diamond01Icon, UserCheck01Icon, UserX01Icon } from '@/assets/icons';
import { Badge, AvatarProfilePhoto } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';
import { selectActiveSubscription } from '@/redux/userSlice';
import type { Plan } from '@/types';

import { data } from './constants';
import type { PropsWithClassName } from '../types';

const planNames: Record<Plan, string> = {
  test: 'Test',
  genesis: 'GENESIS',
  'genesis-plus': 'GENESIS +',
  basic: 'BASIC',
} as const;

export function InfoCardHeader({ className }: PropsWithClassName) {
  const user = useAppSelector((store) => store.user);
  const activeSubscription = useAppSelector(selectActiveSubscription);
  const isBasic = activeSubscription === 'basic';

  return (
    <div
      className={twMerge(
        'rounded-3 border border-gray-200 p-4 pl-5 pr-6 lg:pb-4 lg:pt-3 dark:border-gray-blue-500 dark:bg-blue-zodiac',
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <AvatarProfilePhoto size="sm" image={user.avatarUrl} verified={user.isVerified} />
        <div className="flex flex-col gap-3 overflow-hidden">
          <p className="truncate text-xl font-semibold text-gray-900 lg:pt-2 dark:text-white">{user.email}</p>
          <div className={twJoin('flex gap-2', !isBasic && 'flex-col items-start lg:flex-row')}>
            {!isBasic && (
              <Badge
                icon={
                  user.verification.currentLevel ? (
                    <UserCheck01Icon className="size-3" />
                  ) : (
                    <UserX01Icon className="size-3" />
                  )
                }
                variant="square"
                size="sm"
                color={user.verification.currentLevel ? 'success' : 'error'}
                content={user.verification.currentLevel ? data.buttonSuccessText : data.buttonErrorText}
              />
            )}
            {activeSubscription && (
              <Badge
                icon={<Diamond01Icon className="size-3" />}
                variant="square"
                size="sm"
                color="blue-light"
                content={`${planNames[activeSubscription]} Plan`}
              />
            )}
            <Badge variant="square" size="sm" color="warning" content={`Level ${user.verification.currentLevel}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
