'use client';
import { useParams } from 'next/navigation';

import { Modal } from '@/app/_shared';
import { SlashCircle01 } from '@/assets/icons';
import { Button, FeaturedIcon } from '@/lib/components';
import { routes } from '@/routes';
import { capitalizeFirstLetter } from '@/utils/string';

import { data } from './constants';

export function UserAccessError() {
  const { communityName } = useParams<{ communityName: string }>();

  return (
    <Modal
      theme="dots-background"
      overlayClassName="bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/Background.jpg)] bg-cover bg-center bg-no-repeat"
      contentWrapperClassName="lg:text-center"
    >
      <FeaturedIcon Icon={SlashCircle01} color="error" theme="light-circle-outline" size="lg" />
      <p className="mb-1 pt-4 text-lg font-semibold text-white">
        You are not Invited to Access the {capitalizeFirstLetter(communityName)} Deals
      </p>
      <p className="mb-5 font-rubik text-sm text-gray-blue-100">
        Unfortunately you can’t access those Deals. Please contact {capitalizeFirstLetter(communityName)} to request
        your access.
      </p>
      <Button
        className="w-full"
        href={routes.invest.getRoutePath()}
        content={data.buttonText}
        color="secondary"
        size="md"
      />
    </Modal>
  );
}
