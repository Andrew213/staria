import type { FaqDetail, Faqs, HeroFaq, PopulateFaq, PopulateFaqWithOrder } from '@/types';

import {
  convertAllFaqs,
  convertFaqDetail,
  convertRawFaqsByCategory,
  convertRawHeroFaqs,
  convertRawPopulateFaqs,
} from './converters/faqs';
import type { CMSByPageData, CMSFaqHeroData, CMSKnowledgeBasesData, CMSResponse } from './types';

const FAQ_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

class FaqApi {
  public async getAllFaq(): Promise<Faqs> {
    try {
      let allFaqs: CMSKnowledgeBasesData = [];
      const response = await fetch(`${FAQ_URL}/knowledge-bases`);

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const payload = await (response.json() as Promise<CMSResponse<CMSKnowledgeBasesData>>);

      if ('error' in payload) {
        throw new Error(JSON.stringify(payload.error));
      }

      if (payload.data.length === 0) {
        throw new Error('No data');
      }

      const {
        meta: {
          pagination: { total, pageSize },
        },
      } = payload;

      allFaqs = payload.data;

      if (total > pageSize) {
        const restFaqs = await fetch(
          `${FAQ_URL}/knowledge-bases?pagination[limit]=${total - pageSize}&pagination[start]=${pageSize}`,
        );
        const restPayload = await (restFaqs.json() as Promise<CMSResponse<CMSKnowledgeBasesData>>);

        allFaqs = [...allFaqs, ...restPayload.data!];
      }

      return convertAllFaqs(allFaqs);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getFaqsByCategory(category: string): Promise<PopulateFaqWithOrder[]> {
    const categoryWithTheFirstCapitalLetter = category[0].toUpperCase() + category.slice(1);
    try {
      const response = await fetch(
        `${FAQ_URL}/knowledge-bases?filters[category][$eq]=${categoryWithTheFirstCapitalLetter}`,
        {
          method: 'GET',
        },
      );
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const payload = await (response.json() as Promise<CMSResponse<CMSKnowledgeBasesData>>);

      if ('error' in payload) {
        throw new Error(JSON.stringify(payload.error));
      }
      return convertRawFaqsByCategory(payload.data);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getFaqBySlug(slug: string): Promise<FaqDetail | null> {
    try {
      const response = await fetch(`${FAQ_URL}/knowledge-bases?filters[slug][$eq]=${slug}&populate=questions.items`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const payload = await (response.json() as Promise<CMSResponse<CMSKnowledgeBasesData>>);

      if ('error' in payload) {
        throw new Error(JSON.stringify(payload.error));
      }

      if (payload.data.length === 0) {
        return null;
      }
      return convertFaqDetail(payload.data[0]);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getPopulateFaqsByPage(page: string): Promise<PopulateFaq[]> {
    try {
      const response = await fetch(`${FAQ_URL}/${page}-page?populate=FAQ`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const payload = await (response.json() as Promise<CMSResponse<CMSByPageData>>);

      if ('error' in payload) {
        throw new Error(JSON.stringify(payload.error));
      }

      const {
        attributes: { FAQ },
      } = payload.data;

      if (!FAQ || FAQ.length === 0) {
        throw new Error('No data');
      }

      return convertRawPopulateFaqs(FAQ);
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async getHeroFaqs(): Promise<HeroFaq[]> {
    try {
      const response = await fetch(`${FAQ_URL}/faq-page?populate=FAQ_hero`, {
        method: 'GET',
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const payload = await (response.json() as Promise<CMSResponse<CMSFaqHeroData>>);

      if ('error' in payload) {
        throw new Error(JSON.stringify(payload.error));
      }

      const {
        attributes: { FAQ_hero },
      } = payload.data;

      if (!FAQ_hero || FAQ_hero.length === 0) {
        throw new Error('No data');
      }

      return convertRawHeroFaqs(FAQ_hero);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

export const faqApi = new FaqApi();
