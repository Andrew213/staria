import type { Address } from 'viem';

export function shortenAddress(address: Address | undefined, startCount = 6, countOfPoints = 3, endCount = 4) {
  if (!address) {
    return;
  }

  return `${address.slice(0, startCount)}${'.'.repeat(countOfPoints)}${address.slice(-endCount)}`;
}
