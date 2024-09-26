import { useState } from 'react';

import { Accordion, LoadMoreButton } from '@/lib/components';
import type { FaqQuestion } from '@/types';

import { data } from './constants';
import { getContent } from '../../utils';

interface Props {
  questions: FaqQuestion[];
}

export function RelatedQuestions({ questions }: Props) {
  const [expandedAccordionIndex, setExpandedAccordionIndex] = useState<number | undefined>();
  const [loadMore, setLoadMore] = useState(false);

  return (
    <div className="m-auto flex w-full max-w-screen-md flex-col gap-12 py-8 lg:gap-16 lg:px-8 lg:py-10">
      <h2 className="text-center text-display-md font-semibold tracking-tight text-gray-900 lg:text-display-md">
        {data.title}
      </h2>
      <div className="flex flex-col gap-4">
        {questions.map(({ id, text, title }, index) => {
          const expanded = index === expandedAccordionIndex;

          return (
            <Accordion
              key={id}
              title={title}
              className={`${index >= data.maxItems ? (loadMore ? 'block' : 'hidden') : 'block'}`}
              content={getContent(text)}
              expanded={expanded}
              onClick={() => {
                setExpandedAccordionIndex(expanded ? undefined : index);
              }}
            />
          );
        })}
        {questions.length > data.maxItems && <LoadMoreButton setIsLoadMore={setLoadMore} />}
      </div>
    </div>
  );
}
