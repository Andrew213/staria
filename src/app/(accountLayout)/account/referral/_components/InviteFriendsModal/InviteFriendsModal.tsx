import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';

import { Toaster } from '@/app/_components';
import { Modal } from '@/app/_shared';
import { CopyIcon } from '@/assets/icons';
import { IMAGES_CDN_URL } from '@/env';
import { useAppSelector } from '@/redux/hooks';

import { data } from './constants';

interface Props {
  onClose: () => void;
}

const getShareLink = (type: string, referralUrl: string) => {
  switch (type) {
    case 'twitter': {
      return `http://twitter.com/share?url=${referralUrl}`;
    }

    case 'telegram': {
      return `https://t.me/share/url?url=${referralUrl}`;
    }

    case 'linkedin': {
      return `http://www.linkedin.com/shareArticle?mini=true&url=${referralUrl}`;
    }
    case 'facebook': {
      return `http://www.facebook.com/sharer.php?u=${referralUrl}`;
    }

    default: {
      return '';
    }
  }
};

export function InviteFiendsModal({ onClose }: Props) {
  const { referralCode } = useAppSelector((store) => store.user);
  const referralUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/r/${referralCode}`;

  return (
    <Modal onClose={onClose}>
      <div className="max-w-[400px] rounded-3 bg-white p-4 lg:p-6">
        <div className="text-center">
          <p className="text-display-xs font-semibold text-gray-900">{data.title}</p>
          <p className="mt-1 font-rubik text-sm font-normal text-gray-600">{data.subtitle}</p>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          <Image
            className="rounded-3"
            src={`${IMAGES_CDN_URL}/friends-at-the-mountain.jpeg`}
            width={2500}
            height={1407}
            alt="Three people are looking at the mountains."
          />
          <p className="mb-1.5 text-sm font-medium text-gray-700">{data.inputText}</p>
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard.writeText(referralUrl);
              toast(
                <Toaster
                  text="Referral Link Copied"
                  subtext="Your referral link has been successfully copied to the clipboard."
                  type="success"
                />,
              );
            }}
            className="flex w-full items-center gap-1 overflow-hidden"
          >
            <p className="w-full overflow-hidden truncate rounded-2 border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-btn-primary transition-all duration-200 ease-linear hover:bg-gray-50 hover:text-gray-800 focus:bg-white focus:shadow-btn-secondary-gray-focus disabled:border-gray-300 disabled:bg-gray-300 disabled:text-white lg:max-w-[308px] lg:justify-center">
              {referralUrl}
            </p>
            <div className="p-2.5">
              <CopyIcon className="[&_path]:stroke-gray-500" />
            </div>
          </button>
          <div className="flex items-center gap-2">
            <div className="h-px w-full bg-gray-200" />
            <span className="text-sm font-medium text-gray-600">OR</span>
            <div className="h-px w-full bg-gray-200" />
          </div>
          <div>
            <p className="mb-3 text-sm font-medium text-gray-700">{data.socialsText}</p>
            <div className="mb-4 flex items-center gap-6">
              {data.socials.map(({ icon: Icon, type }, index) => {
                return (
                  <Link
                    key={index}
                    href={getShareLink(type, referralUrl)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-6 text-gray-800"
                  >
                    <Icon />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
