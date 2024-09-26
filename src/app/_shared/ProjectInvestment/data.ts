import { CheckSquareBroken, CoinsStacked02, Star04, UserSquare, Wallet03 } from '@/assets/icons';
import type { Step } from '@/lib/components/ProgressSteps/types';

import type { DealInvestmentPhaseName } from '../types';

const TEXTS = {
  stepperSectionTitle: 'You are participating in:',
};

const DEAL_INVESTMENT_PHASE_NAME_TO_PHASE_LONG_NAME: Record<DealInvestmentPhaseName, string> = {
  guaranteed: 'Guaranteed Allocation',
  fcfs: 'FCFS Allocation',
  lottery: 'Lottery',
};

const NOT_LOTTERY_STEPS: Step[] = [
  {
    id: 0,
    Icon: Wallet03,
    title: '1. Connect a Wallet to Start',
  },
  {
    id: 1,
    Icon: CoinsStacked02,
    title: '2. Select Amount to Invest',
  },
  {
    id: 2,
    Icon: UserSquare,
    title: '3. KYC Check',
  },
  {
    id: 3,
    Icon: CheckSquareBroken,
    title: '4. Participate in Sales',
  },
];

const PROJECT_INVESTMENT_PHASE_NAME_TO_STEPS: Record<DealInvestmentPhaseName, Step[]> = {
  guaranteed: NOT_LOTTERY_STEPS,
  fcfs: NOT_LOTTERY_STEPS,
  lottery: [
    {
      id: 0,
      Icon: Wallet03,
      title: '1. Connect a Wallet to Start',
    },
    {
      id: 1,
      Icon: Star04,
      title: '2. Select Amount to Invest',
    },
    {
      id: 2,
      Icon: CoinsStacked02,
      title: '3. Select Amount to Invest',
    },
    {
      id: 3,
      Icon: UserSquare,
      title: '4. KYC Check',
    },
    {
      id: 4,
      Icon: CheckSquareBroken,
      title: '5. Participate in Sales',
    },
  ],
};

export { TEXTS, DEAL_INVESTMENT_PHASE_NAME_TO_PHASE_LONG_NAME, PROJECT_INVESTMENT_PHASE_NAME_TO_STEPS };
