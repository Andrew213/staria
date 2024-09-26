import Link from 'next/link';
import { useState } from 'react';

import { LoadMoreButton } from '@/lib/components';
import { routes } from '@/routes';
import type { PopulateFaq } from '@/types';
import { getArrayItemsByThree, toKebabCase } from '@/utils';

import { getContent } from '../../utils';
import { data } from '../RelatedQuestions/constants';

interface Props {
  items: PopulateFaq[];
  linkTitle: string;
}

export function DiscoverGrid({ items, linkTitle }: Props) {
  const itemsByThree = getArrayItemsByThree(items);
  const [isLoadMore, setIsLoadMore] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-16">
        {itemsByThree.map(({ slug, title, textPreview, id, category }, index) => (
          <div
            key={id}
            className={`flex flex-col gap-2 ${index >= data.maxItems ? (isLoadMore ? 'block' : 'hidden') : 'block'}`}
          >
            <p className="text-xl font-semibold text-gray-900">{title}</p>
            <div className="font-rubik text-md text-gray-600">
              {getContent(textPreview)}{' '}
              <Link
                className="font-rubik text-primary-500 underline"
                href={routes.faq.faqCategory.faqSlug.getRedirectPath({
                  faqCategory: category ? toKebabCase(category) : '/',
                  faqSlug: slug ?? '/',
                })}
              >
                {linkTitle}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {itemsByThree.length > data.maxItems && (
        <div className="m-auto">
          <LoadMoreButton setIsLoadMore={setIsLoadMore} className="!mt-0 lg:!-mt-6" />
        </div>
      )}
    </>
  );
}
