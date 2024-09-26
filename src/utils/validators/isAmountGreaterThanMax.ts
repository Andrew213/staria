export const isAmountGreaterThanMax = (max: bigint, currency: string) => (value: bigint) => {
  return value > max ? `Amount must not exceed ${max.toString()} ${currency}` : undefined;
};
