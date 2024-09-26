import type { Plan } from '@/types';

export const planNames: Record<Plan, string> = {
  test: 'Test',
  genesis: 'GENESIS',
  'genesis-plus': 'GENESIS +',
  basic: 'BASIC',
} as const;
