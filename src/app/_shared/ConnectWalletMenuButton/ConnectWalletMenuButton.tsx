'use client';

import { ConnectKitButton } from 'connectkit';
import { useDisconnect } from 'wagmi';

import { WalletIcon } from '@/assets/icons';

import { data } from './constants';

export function ConnectWalletMenuButton() {
  const { disconnect } = useDisconnect();
  return (
    <ConnectKitButton.Custom>
      {({ isConnected, truncatedAddress, show }) => {
        return (
          <button
            type="button"
            onClick={() => {
              isConnected ? disconnect() : show?.();
            }}
            className="flex w-full items-start gap-2 border-b border-t px-2.5 py-3.75 hover:bg-gray-100"
          >
            <WalletIcon className="size-4 text-primary-500" />
            <div className="flex flex-col">
              <p className="text-sm font-medium text-gray-800">{isConnected ? truncatedAddress : data.title}</p>
              {isConnected && <p className="mt-1 text-xs font-medium text-gray-500">{data.disconnectText}</p>}
            </div>
          </button>
        );
      }}
    </ConnectKitButton.Custom>
  );
}
