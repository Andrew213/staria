'use client';
import { useLocalStorageState } from 'ahooks';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

import { Modal } from '@/app/_shared';
import { Button, Checkbox } from '@/lib/components';
import { capitalizeFirstLetter } from '@/utils/string';

import { data } from './constants';

interface Props {
  logo: string;
}

export function ConfirmationAccessCompanyDeals({ logo }: Props) {
  const [checked, setChecked] = useState(false);
  const { communityName } = useParams<{ communityName: string }>();
  const [, setCommunityRulesAreAccepted] = useLocalStorageState<boolean | undefined>('communityRulesAreAccepted');
  const isSvg = logo.endsWith('.svg');

  return (
    <Modal
      theme="dots-background"
      overlayClassName="bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/Background.jpg)] bg-cover bg-center bg-no-repeat"
      contentWrapperClassName="lg:text-center"
    >
      <div className="flex flex-col">
        <div className="relative size-16 lg:self-center">
          <Image className="object-contain" alt={communityName} src={logo} fill sizes={!isSvg ? '64px' : undefined} />
        </div>

        <p className="mb-1 pt-4 text-lg font-semibold text-white">
          You will Access {capitalizeFirstLetter(communityName)} Deals
        </p>
        <p className="mb-5 font-rubik text-sm text-gray-blue-100">{data.subtitle}</p>
        <div className="mb-5 flex items-start gap-2">
          <Checkbox
            className="-mt-1.5 border-gray-blue-200 bg-downriver checked:bg-primary-50"
            size="sm"
            inputProps={{
              checked,
              onChange: () => {
                setChecked(!checked);
              },
            }}
          />
          <p className="text-left text-sm font-medium text-gray-25">{data.terms}</p>
        </div>
        <Button
          className="disabled:text-gray-blue-400"
          type="button"
          size="lg"
          color="secondary"
          content={data.buttonText}
          disabled={!checked}
          onClick={() => {
            setCommunityRulesAreAccepted(true);
          }}
        />
      </div>
    </Modal>
  );
}
