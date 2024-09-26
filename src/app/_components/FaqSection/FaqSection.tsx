import { FaqSectionWrapper } from '@/app/_shared';
import { PopulateFaqs } from '@/features/faq';
import type { PopulateFaq } from '@/types';

interface Props {
  faqs: PopulateFaq[];
}

export function FaqSection({ faqs }: Props) {
  return (
    <FaqSectionWrapper>
      <PopulateFaqs populateFaqs={faqs} />
    </FaqSectionWrapper>
  );
}
