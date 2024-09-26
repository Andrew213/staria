import type { DealShortInfo, Deal } from './types';

export function getDealCurrentPhaseData(deal: DealShortInfo | Deal) {
  return deal.phases.find(({ type }) => type === deal.currentPhase);
}
