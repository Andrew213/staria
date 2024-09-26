'use client';

import Link from 'next/link';
import { useState } from 'react';

import { Accordion, LoadMoreButton } from '@/lib/components';
import { routes } from '@/routes';
import type { PopulateFaq } from '@/types';
import { toKebabCase } from '@/utils';

import { data } from './data';
import { getContent } from '../../utils';

interface Props {
  page?: string;
  populateFaqs: PopulateFaq[];
}

export function PopulateFaqs({ populateFaqs }: Props) {
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState<number | undefined>();
  const [isLoadMore, setIsLoadMore] = useState(false);

  return (
    <div className="flex flex-col items-stretch gap-4 transition-all duration-200 ease-linear">
      {populateFaqs.map(({ slug, title, textPreview, id, category }, index) => {
        const expanded = index === expandedAccordionIndex;

        return (
          <Accordion
            key={id}
            title={title}
            content={
              <>
                {getContent(textPreview)}
                {slug && category && (
                  <Link
                    className="relative inline text-primary-500 after:absolute after:inset-x-0 after:bottom-0.5 after:border-b after:border-primary-500 after:content-['']"
                    href={routes.faq.faqCategory.faqSlug.getRedirectPath({
                      faqCategory: toKebabCase(category),
                      faqSlug: slug,
                    })}
                    target="_blank"
                  >
                    {data.linkTitle}
                  </Link>
                )}
              </>
            }
            className={`${index >= data.MAX_ITEMS ? (isLoadMore ? 'block' : 'hidden') : 'block'}`}
            expanded={expanded}
            onClick={() => {
              setExpandedAccordionIndex(expanded ? undefined : index);
            }}
          />
        );
      })}
      {populateFaqs.length > data.MAX_ITEMS && <LoadMoreButton setIsLoadMore={setIsLoadMore} />}
    </div>
  );
}
