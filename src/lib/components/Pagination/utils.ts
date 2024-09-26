import type { NavItem, URIParams } from './types';

const getMiddlePage = (leftPage: number, rightPage: number): number =>
  Math.round(leftPage + (rightPage - leftPage) / 2);

const get7NavItems = (totalPages: number, currentPage: number): NavItem[] => [
  { label: '1', value: 1 },

  currentPage > 4 && currentPage < totalPages - 2
    ? { label: '...', value: getMiddlePage(1, currentPage - 1) }
    : { label: '2', value: 2 },

  currentPage > 3 && currentPage < totalPages - 2
    ? { label: `${currentPage - 1}`, value: currentPage - 1 }
    : currentPage > 3 && currentPage < totalPages - 1
      ? { label: '...', value: getMiddlePage(2, totalPages - 2) }
      : { label: '3', value: 3 },

  currentPage === 3
    ? { label: '4', value: 4 }
    : currentPage > 3 && currentPage < totalPages - 2
      ? { label: `${currentPage}`, value: currentPage }
      : currentPage === totalPages - 2
        ? { label: `${currentPage - 1}`, value: currentPage - 1 }
        : { label: '...', value: getMiddlePage(3, totalPages - 2) },

  currentPage === 3
    ? { label: '...', value: getMiddlePage(4, totalPages - 1) }
    : currentPage > 3 && currentPage < totalPages - 2
      ? { label: `${currentPage + 1}`, value: currentPage + 1 }
      : { label: `${totalPages - 2}`, value: totalPages - 2 },

  currentPage > 3 && currentPage < totalPages - 3
    ? { label: '...', value: getMiddlePage(currentPage + 1, totalPages) }
    : { label: `${totalPages - 1}`, value: totalPages - 1 },

  { label: `${totalPages}`, value: totalPages },
];

export const getNavItems = (totalPages: number, currentPage: number): NavItem[] =>
  totalPages <= 7
    ? Array.from({ length: totalPages }, (_, i) => ({
        label: `${i + 1}`,
        value: i + 1,
      }))
    : get7NavItems(totalPages, currentPage);

export const getFullHref = ({ pathname, paramName, searchParams }: URIParams, value: number) =>
  `${pathname}?${searchParams ? `${searchParams}&` : ''}${paramName}=${value}`;
