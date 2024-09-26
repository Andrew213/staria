import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import { Accordion, InputDropdown, LoadMoreButton, Tabs } from '@/lib/components';
import { useBreakpoint } from '@/lib/hooks';
import { routes } from '@/routes';
import type { Faqs } from '@/types';
import { toKebabCase } from '@/utils';

import { data } from './constants';
import { getContent } from '../../utils';

type FaqsByCategory = Record<string, Faqs>;

interface Props {
  faqs: Faqs;
}

export function FaqCategories({ faqs }: Props) {
  const { isBelowLg } = useBreakpoint('lg');

  const [curTab, setCurTab] = useState<string | null>(null);
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState<number | undefined>();
  const [isLoadMore, setIsLoadMore] = useState(false);

  const tabsItems = useMemo(
    () =>
      data.categories.map((category) => ({
        label: category.title,
        value: category.title,
      })),
    [],
  );

  useEffect(() => {
    if (tabsItems.length && !curTab) {
      setCurTab(tabsItems[0].value);
    }
  }, [tabsItems, curTab]);

  const faqsByCategory = {} as FaqsByCategory;

  if (!faqs || !curTab) return null;

  faqs.forEach((x) => {
    if (!x.category) {
      return;
    }
    faqsByCategory[x.category] = faqsByCategory[x.category] ? [...faqsByCategory[x.category], x] : [x];
  });

  return (
    <div>
      {!isBelowLg && (
        <div className="w-full overflow-hidden lg:grow">
          <Tabs
            onSelect={(selectedTab) => {
              setCurTab(selectedTab);
              setExpandedAccordionIndex(undefined);
            }}
            items={tabsItems}
            current={curTab}
          />
        </div>
      )}

      {isBelowLg && (
        <InputDropdown
          onSelect={(selectedTab) => {
            setCurTab(selectedTab);
            setExpandedAccordionIndex(undefined);
          }}
          items={tabsItems}
          current={curTab}
          placeholder="Select filter"
        />
      )}

      <div className="flex flex-col gap-4 pb-16 pt-8 lg:gap-8 lg:pb-24 lg:pt-14">
        <div className="flex max-w-screen-md flex-col gap-5">
          <h2 className="text-display-md font-semibold tracking-tight text-gray-900 lg:text-display-lg">{curTab}</h2>
          {/*  TODO unmock description */}
          <p className="font-rubik text-lg text-gray-600 lg:text-xl">
            {data.categories.find((category) => category.title.toLowerCase() === curTab.toLowerCase())?.description}
          </p>
        </div>

        <div className="grid items-stretch gap-4 transition-all duration-200 ease-linear lg:grid-cols-2 lg:gap-x-16">
          {faqsByCategory[curTab]?.map((x, idx) => {
            const expanded = idx === expandedAccordionIndex;

            return (
              <Accordion
                key={x.faqSlug}
                title={x.title}
                className={`${idx >= data.MAX_ITEMS ? (isLoadMore ? 'block' : 'hidden') : 'block'}`}
                content={
                  <>
                    {getContent(x.textPreview)}{' '}
                    <Link
                      className="relative inline text-primary-500 after:absolute after:inset-x-0 after:bottom-0.5 after:border-b after:border-primary-500 after:content-['']"
                      href={routes.faq.faqCategory.faqSlug.getRedirectPath({
                        faqCategory: x.category ? toKebabCase(x.category) : '/',
                        faqSlug: x.faqSlug ?? '/',
                      })}
                    >
                      {data.linkTitle}
                    </Link>
                  </>
                }
                expanded={expanded}
                onClick={() => {
                  setExpandedAccordionIndex(expanded ? undefined : idx);
                }}
              />
            );
          })}
          {faqs.length > data.MAX_ITEMS && (
            <div className="col-span-full justify-self-center">
              <LoadMoreButton setIsLoadMore={setIsLoadMore} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
