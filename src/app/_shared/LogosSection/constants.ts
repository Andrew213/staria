import { ChainalysisLogo, SofitLogo, SpaceBLogo, SpaceBMobileLogo } from '@/assets/icons';

export const logosData = {
  title: 'Our Strategic Partners',
  logos: [
    {
      icon: SofitLogo,
      text: 'SO-FIT is a FINMA-approved self-regulatory organization supervising financial intermediaries under article 2 al.3 of the Swiss AML and terrorism financing law (LBA).',
    },
    {
      icon: ChainalysisLogo,
      text: 'Chainalysis offers blockchain data solutions for AML compliance, enabling businesses to monitor cryptocurrency transactions and ensure regulatory adherence. Their free API helps screen wallets for suspicious activities, enhancing AML measures.',
    },
    {
      icon: SpaceBLogo,
      mobileIcon: SpaceBMobileLogo,
      text: 'Space B is a community hub run by BNB Chain to support Web3 entrepreneurs looking for a workspace to meet, build, and support each other.',
    },
  ],
};
