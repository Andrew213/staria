'use client';

import cn from 'classnames';
import { useModal } from 'connectkit';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useAccount, useSignMessage } from 'wagmi';

import { userApi } from '@/api/UserApi';
import { Toaster } from '@/app/_components';
import { env } from '@/app/_shared/constants';
import { CopyIcon, ShareIcon } from '@/assets/icons';
import { Button, Player, VideoModal } from '@/lib/components';
import { useBreakpoint } from '@/lib/hooks';
import { useAppSelector } from '@/redux/hooks';
import { shortenAddress } from '@/utils';
import { getAndSaveUser } from '@/utils/getAndSaveUser';

import { data } from './constants';
import { InviteFiendsModal } from '../InviteFriendsModal/InviteFriendsModal';

interface ReferralProps {
  media: string;
  poster: string;
}

export function HeroSection({ media, poster }: ReferralProps) {
  const [userReferralWalletIsBeingSet, setUserReferralWalletIsBeingSet] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isInviteFriendsModalOpen, setIsInviteFriendsModalOpen] = useState(false);
  const { isConnected: walletIsConnected, address: connectedAddress } = useAccount();
  const { signMessage } = useSignMessage();
  const { setOpen: setConnectWalletModalOpen } = useModal();
  const user = useAppSelector((store) => store.user);
  const dispatch = useDispatch();
  const { isBelowSm } = useBreakpoint('sm');
  const { isAboveLg } = useBreakpoint('lg');
  const session = useSession();
  function signReferralAgreement() {
    signMessage(
      {
        message: `I hereby agree that all my referral rewards will affected to the address ${connectedAddress}, and that I'm solely responsible for having access to the wallet address in question. Referral rewards will have to be claimed through ${env.frontendUrl} platform.`,
      },
      {
        async onSuccess() {
          setUserReferralWalletIsBeingSet(true);

          const editUserResponse = await userApi.editUser({
            referralWallet: connectedAddress,
          });
          const userIsEditedSuccessfully = editUserResponse?.status === 200;

          if (userIsEditedSuccessfully && session.status === 'authenticated') {
            await getAndSaveUser(dispatch, session.data.sessionToken);
          }

          toast(
            <Toaster
              type={userIsEditedSuccessfully ? 'success' : 'error'}
              text={userIsEditedSuccessfully ? 'Referral Wallet Saved' : 'Referral Wallet Is Not Saved'}
              subtext={
                userIsEditedSuccessfully
                  ? 'Your referral wallet details have been successfully saved.'
                  : 'Your referral wallet details have not been saved.'
              }
            />,
          );
          setUserReferralWalletIsBeingSet(false);
        },
      },
    );
  }

  return (
    <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
      <div className="w-full max-w-[565px]">
        <h2 className="mb-8 text-display-md font-semibold text-gray-900 lg:mb-10 lg:text-display-lg">{data.title}</h2>
        <div className="flex flex-col gap-9 lg:gap-6">
          <div>
            <p className="mb-1.5 text-md font-semibold text-gray-700">{data.referralText}</p>
            <div className="flex flex-col items-center gap-4 lg:flex-row">
              <button
                onClick={() => {
                  void navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/r/${user.referralCode}`);
                  toast(
                    <Toaster
                      text="Referral Link Copied"
                      subtext="Your referral link has been successfully copied to the clipboard."
                      type="success"
                    />,
                  );
                }}
                className="flex w-full items-center justify-between gap-2 overflow-hidden rounded-2 border border-gray-300 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-btn-primary transition-all duration-200 ease-linear hover:bg-gray-50 hover:text-gray-800 focus:bg-white focus:shadow-btn-secondary-gray-focus disabled:border-gray-300 disabled:bg-gray-300 disabled:text-white lg:w-auto lg:max-w-[390px] lg:justify-center"
              >
                <p className="truncate">{`${process.env.NEXT_PUBLIC_FRONTEND_URL}/r/${user.referralCode} `}</p>
                <div>
                  <CopyIcon />
                </div>
              </button>
              {isInviteFriendsModalOpen && (
                <InviteFiendsModal
                  onClose={() => {
                    setIsInviteFriendsModalOpen(false);
                  }}
                />
              )}
              <Button
                onClick={() => setIsInviteFriendsModalOpen(true)}
                content={data.referralButtonText}
                size="md"
                color="primary"
                className="w-full lg:w-auto"
                icon={<ShareIcon />}
              />
            </div>
          </div>
          <div>
            <p className="mb-1.5 text-md font-semibold text-gray-700">{data.walletText}</p>
            <div
              className={cn({
                'flex max-lg:flex-col max-lg:gap-y-4 lg:gap-x-4': user.referralWallet,
              })}
            >
              {user.referralWallet && (
                <p className="rounded-2 border border-gray-300 px-3.75 py-2.5 text-center text-sm font-semibold text-gray-600 shadow-button-xs">
                  {isBelowSm || isAboveLg ? shortenAddress(user.referralWallet) : user.referralWallet}
                </p>
              )}
              <Button
                color="secondary-gray"
                size="md"
                content={
                  user.referralWallet
                    ? data.ChangeWalletButtonText
                    : walletIsConnected
                      ? data.SignReferralAgreementButtonText
                      : data.ConnectButtonText
                }
                type="button"
                loading={userReferralWalletIsBeingSet}
                onClick={() => {
                  if (walletIsConnected) {
                    signReferralAgreement();
                    return;
                  }

                  setConnectWalletModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {showVideoModal && <VideoModal onClose={() => setShowVideoModal(false)} autoplay url={media} />}
      <Player
        rootClassnames="lg:!h-[324px] !h-[224px] !w-full max-w-[565px] lg:!w-[474px] rounded-3 object-cover !p-0"
        url={media}
        poster={poster}
        autoplay={false}
        onClick={() => setShowVideoModal(true)}
        previewMode
      />
    </div>
  );
}
