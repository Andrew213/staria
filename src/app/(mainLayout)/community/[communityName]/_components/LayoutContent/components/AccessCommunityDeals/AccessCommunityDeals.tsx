'use client';
import { useModal } from 'connectkit';
import Image from 'next/image';
import { useParams } from 'next/navigation';

import { Modal } from '@/app/_shared';
import { WalletIcon } from '@/assets/icons';
import { Button } from '@/lib/components';
import { capitalizeFirstLetter } from '@/utils/string';

import { data } from './constants';

interface Props {
  logo: string;
}

export function AccessCommunityDeals({ logo }: Props) {
  const { communityName } = useParams<{ communityName: string }>();
  const { setOpen: setConnectWalletModalOpen } = useModal();
  const isSvg = logo.endsWith('.svg');

  return (
    <Modal
      theme="dots-background"
      overlayClassName="bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/Background.jpg)] bg-cover bg-center bg-no-repeat"
      contentWrapperClassName="lg:text-center"
    >
      <div className="flex flex-col text-white">
        <div className="relative size-16 lg:self-center">
          <Image className="object-contain" alt={communityName} src={logo} fill sizes={!isSvg ? '64px' : undefined} />
        </div>
        <p className="mb-1 pt-4 text-lg font-semibold">Access {capitalizeFirstLetter(communityName)} Deals</p>
        <p className="mb-5 font-rubik text-sm text-gray-blue-100">{data.subtitle}</p>
        <Button
          type="button"
          size="lg"
          color="dark"
          onClick={() => setConnectWalletModalOpen(true)}
          content={
            <>
              <WalletIcon className="size-5" />
              {data.buttonText}
            </>
          }
        />
      </div>
    </Modal>
  );
}
