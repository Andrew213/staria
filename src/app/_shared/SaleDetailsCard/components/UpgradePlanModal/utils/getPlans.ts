import { LayersThreeIcon, ZapIcon } from '@/assets/icons';

const genesisPlan = {
  id: 'genesis',
  title: 'GENESIS Plan',
  description: 'Get access to FCFS, VIP Deals, 7 Level Profit Sharing.',
  Icon: LayersThreeIcon,
} as const;

const genesisPlusPlan = {
  id: 'genesis-plus',
  title: 'GENESIS + Plan',
  description: 'Get Unlimited Access to Guaranteed Allocation , VIP Deals, 10 Level Profit Sharing and much more.',
  Icon: ZapIcon,
} as const;

function getPlans(projectPhase: string) {
  return projectPhase === 'guaranteed' ? [genesisPlusPlan] : [genesisPlan, genesisPlusPlan];
}

export default getPlans;
