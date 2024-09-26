export const isInsufficientBalance = (max: bigint) => (value: bigint) => {
  return value > max ? 'Insufficient balance' : undefined;
};
