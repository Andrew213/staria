export const isAmountLowerThanMin = (min: bigint, currency: string) => (value: bigint) => {
  return value < min ? `Amount must be at least ${min.toString()} ${currency}` : undefined;
};
