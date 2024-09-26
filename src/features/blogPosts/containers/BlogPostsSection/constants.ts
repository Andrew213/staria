export const sorts = [
  { label: 'Most recent', value: 'recent' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'A-z', value: 'a-z' },
];

export const paramNames = {
  category: 'category',
  page: 'page',
  sort: 'sort',
} as const;

export const MAX_ITEMS = 9;
