'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig, ConnectKitProvider } from 'connectkit';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { bsc, bscTestnet } from 'wagmi/chains';

import { ruberoid } from '@/app/_fonts';
import { env } from '@/app/_shared/constants';
import { useMode } from '@/app/_shared/hooks';

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}

const config = createConfig(
  getDefaultConfig({
    chains: [bsc, bscTestnet],
    transports: {
      [bsc.id]: http(`https://bnb-mainnet.g.alchemy.com/v2/${env.alchemyApiKey}`),
      [bscTestnet.id]: http(`https://bnb-testnet.g.alchemy.com/v2/${env.alchemyApiKey}`),
    },
    ssr: true,
    walletConnectProjectId: env.walletConnectProjectId,
    appName: 'Staria: The Web3 Swisspad for Compliant Token Sales',
    appDescription:
      'Discover our token-free, fair access Swisspad › Participate in exclusive offerings in crypto ✓ IDOs ✓ private & public rounds ✓ Swiss AML compliant',
    appIcon: 'https://avatars.githubusercontent.com/u/153767824',
    appUrl: env.frontendUrl,
  }),
);

const queryClient = new QueryClient();

export default function Web3Provider({ children }: { children: React.ReactNode }) {
  const mode = useMode();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider
          customTheme={{
            '--ck-font-family': ruberoid.style.fontFamily,
          }}
          mode={mode}
          options={{
            initialChainId: process.env.NODE_ENV === 'production' ? bsc.id : bscTestnet.id,
            walletConnectName: 'WalletConnect',
          }}
        >
          {children}
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
