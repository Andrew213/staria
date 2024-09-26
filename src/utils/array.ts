export const getArrayItemsByThree = <T extends object>(items: T[]): T[] => {
  return items.slice(0, Math.floor(items.length / 3) * 3);
};
