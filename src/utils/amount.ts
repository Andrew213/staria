import { usNumberDefaultFormat } from '@/app/_shared/constants';

import { isNumber } from './validators';

export const toFormattedAmount = (amount: number) => {
  return usNumberDefaultFormat.format(amount);
};

// TODO create a type for number | `${number}` | 'TBA'
// TODO create formatter for currency
export const toAmountIn$orString = (amount: number | `${number}` | 'TBA') => {
  return isNumber(amount) ? `$${toFormattedAmount(Number(amount))}` : amount;
};

export const toAmountInUSD = (amount: number) => {
  return `${toFormattedAmount(amount)} USD`;
};

export const toAmountInTokens = (amount: bigint | number, tokenName?: string) => {
  return `${toFormattedAmount(Number(amount))}${tokenName ? ` ${tokenName}` : ''}`;
};
