import { FaqSectionWrapper } from '@/app/_shared';
import { PopulateFaqs } from '@/features/faq';
import type { PopulateFaq } from '@/types';

interface Props {
  populateFaqs: PopulateFaq[];
}

export function FaqSection({ populateFaqs }: Props) {
  return (
    <div className="flex justify-center">
      <FaqSectionWrapper>
        <PopulateFaqs populateFaqs={populateFaqs} />
      </FaqSectionWrapper>
    </div>
  );
}
