import type { DealInvestmentPhaseName } from '@/app/_shared/types';

const STEPS_INDEXES: Record<DealInvestmentPhaseName, number> = {
  guaranteed: 1,
  fcfs: 2,
  lottery: 3,
};

const DEAL_INVESTMENT_PHASE_NAME_TO_PHASE_LONG_NAME: Record<DealInvestmentPhaseName, string> = {
  guaranteed: 'Guaranteed Allocations',
  fcfs: 'FCFS Allocations',
  lottery: 'Allocation Draw',
};

export { STEPS_INDEXES, DEAL_INVESTMENT_PHASE_NAME_TO_PHASE_LONG_NAME };
