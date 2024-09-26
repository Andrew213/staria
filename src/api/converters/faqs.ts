import type { FaqDetail, Faqs, HeroFaq, PopulateFaq, PopulateFaqWithOrder } from '@/types';

import type { CMSByPageData, CMSFaqHeroData, CMSKnowledgeBasesData } from '../types';

export const convertRawPopulateFaqs = (faqs: CMSByPageData['attributes']['FAQ']): PopulateFaq[] => {
  const populateFaqs = faqs
    ? faqs.map(({ title, text, id, slug, category }) => ({
        id,
        slug: slug,
        title: title ?? '',
        textPreview: text ?? [],
        category,
      }))
    : [];

  return populateFaqs;
};

export const convertRawFaqsByCategory = (faqs: CMSKnowledgeBasesData): PopulateFaqWithOrder[] => {
  const populateFaqs = faqs
    ? faqs.map(({ id, attributes }) => ({
        id,
        slug: attributes.slug ?? '',
        title: attributes.title ?? '',
        textPreview: attributes.text_preview ?? '',
        category: attributes.category ?? '',
        order: attributes.order ?? 0,
      }))
    : [];

  return populateFaqs;
};

export const convertRawHeroFaqs = (faqs: CMSFaqHeroData['attributes']['FAQ_hero']): HeroFaq[] => {
  const populateFaqs = faqs
    ? faqs.map(({ title, text, id, url }) => ({
        id,
        url: url,
        title: title ?? '',
        textPreview: text ?? [],
      }))
    : [];

  return populateFaqs;
};

export const convertFaqDetail = (faq: CMSKnowledgeBasesData[number]): FaqDetail => {
  const {
    id,
    attributes: { title, subtitle, text_detailed, text_preview, questions },
  } = faq;

  const faqDetail = {
    id,
    title: title ?? '',
    subtitle: subtitle ?? '',
    textDetailed: text_detailed ?? '',
    textPreview: text_preview ?? '',
    questions: questions ?? [],
  };

  return faqDetail;
};

export const convertAllFaqs = (faqs: CMSKnowledgeBasesData): Faqs => {
  return faqs.map(({ id, attributes: { slug, title, text_preview, category } }) => ({
    id,
    faqSlug: slug ?? '2', // TODO remove it when slug well be filled on the backend
    title: title ?? '',
    textPreview: text_preview ?? [],
    category: category ?? '',
  }));
};
