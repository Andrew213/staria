import { useModal } from 'connectkit';

import { Wallet02 } from '@/assets/icons';
import { FeaturedIcon, Button } from '@/lib/components';

import { TEXTS } from './constants';

export function ConnectWallet() {
  const { setOpen: setConnectWalletModalOpen } = useModal();

  return (
    <>
      <div className="mb-8 text-center lg:px-4">
        <FeaturedIcon className="mb-2" theme="light-circle-outline" color="primary" size="lg" Icon={Wallet02} />
        <h2 className="mb-3 text-display-xs font-semibold text-gray-900 lg:text-display-sm dark:text-white">
          {TEXTS.title}
        </h2>
        <p className="font-rubik text-sm text-gray-600 dark:text-gray-blue-100">{TEXTS.description}</p>
      </div>
      <Button
        className="w-full"
        color="primary"
        size="lg"
        content={TEXTS.button}
        type="button"
        onClick={() => {
          setConnectWalletModalOpen(true);
        }}
      />
    </>
  );
}
