import type { PostsShortInfo } from '@/types';

const sortByRecent = (posts: PostsShortInfo) => {
  return [...posts].sort((a, b) => -((a.published ?? 0) - (b.published ?? 0)));
};

const sortByOldest = (posts: PostsShortInfo) => {
  return [...posts].sort((a, b) => (a.published ?? 0) - (b.published ?? 0));
};

const sortByAlphabet = (posts: PostsShortInfo) => {
  return [...posts].sort((a, b) => {
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });
};

export const sortingFunctions = {
  recent: sortByRecent,
  oldest: sortByOldest,
  'a-z': sortByAlphabet,
};
