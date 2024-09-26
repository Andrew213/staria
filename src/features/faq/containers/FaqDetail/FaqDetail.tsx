'use client';

import type { FaqDetail as FaqDetailType } from '@/types';

import { DetailHeader, RelatedQuestions } from '../../components';

interface Props {
  faqDetail: FaqDetailType;
}

// TODO add passing video url to DetailHeader
export function FaqDetail({ faqDetail }: Props) {
  return (
    <>
      <DetailHeader heading={faqDetail.title} supportingText={faqDetail.textDetailed} />
      {!!faqDetail.questions.length && <RelatedQuestions questions={faqDetail.questions} />}
    </>
  );
}
