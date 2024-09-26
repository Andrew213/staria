import { CheckCircleBroken } from '@/assets/icons';
import type { Step } from '@/lib/components/ProgressSteps/types';

export const data = {
  statusBadgeText: 'Your Status:',
  upgradeButton: 'Upgrade',
  title: 'My Settings',
};

export const kycData = {
  title: 'Your investment limit is based on KYC requirements',
  description: 'The verification process depend on the amount you are ready to invest',
};

export const infoCardData = {
  depositLimit: 'Actual Deposit Limit:',
  withdrawLimit: 'Withdraw Limit:',
  documentNeeded: 'Document Needed:',
  proofOfAddress: 'Proof of Address',
  increaseLimits: 'Increase Limits',
  noKycIncreaseText: 'Increase your Investments Limits',
  accountLimits: 'Your Account Limits',
  accountLimitsReached: 'Your Account Limits are Reached',
  totalInvested: 'Total Invested',
  unlimitedLimits: 'Unlimited Limits',
  unlimited: 'Unlimited',
};

export const stepperData: Step[] = [
  {
    id: 0,
    Icon: CheckCircleBroken,
    title: 'Level 0: No Investment',
    description: '- No proof required',
  },
  {
    id: 1,
    Icon: CheckCircleBroken,
    title: 'Level 1: 0 to 10,000 USD',
    description: `- Facial Recognition
- Government ID`,
  },
  {
    id: 2,
    Icon: CheckCircleBroken,
    title: 'Level 2: Up to 100,000 USD',
    description: '- Proof of Address',
  },
  {
    id: 3,
    Icon: CheckCircleBroken,
    title: 'Level 3: Unlimited Investment',
    description: '- Proof of Funds',
  },
];
