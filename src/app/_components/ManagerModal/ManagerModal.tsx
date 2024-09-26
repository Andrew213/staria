'use client';
import { UserSquare } from '@/assets/icons';
import { Button, FeaturedIcon } from '@/lib/components';
import { useAppSelector } from '@/redux/hooks';
import { selectManagedCommunitySlug } from '@/redux/userSlice';
import { routes } from '@/routes';

import { data } from './constants';

interface Props {
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ManagerModal({ setCloseModal }: Props) {
  const managedCommunitSlug = useAppSelector(selectManagedCommunitySlug);
  return (
    <div className="max-w-100 rounded-3 bg-white text-center">
      <div className="p-6">
        <FeaturedIcon theme="light-circle-outline" color="success" Icon={UserSquare} size="lg" />
        <p className="mt-4 text-lg font-semibold text-gray-900">{data.title}</p>
        <p className="mt-1 font-rubik text-sm font-normal text-gray-600">{data.text}</p>
      </div>
      <div className="mt-2 border-t">
        <div className="flex gap-3 p-6">
          <Button
            size="lg"
            className="flex-1"
            onClick={() => {
              setCloseModal(false);
            }}
            content={data.buttonCancelText}
            color="secondary-gray"
          />
          {/* TODO: change href to manager path */}
          <Button
            href={
              managedCommunitSlug
                ? routes.community.manage.communityName.getRedirectPath({ communityName: managedCommunitSlug })
                : routes.community.new.getRoutePath()
            }
            size="lg"
            onClick={() => {
              setCloseModal(false);
            }}
            className="flex-1"
            color="primary"
            content={data.buttonOkText}
          />
        </div>
      </div>
    </div>
  );
}
