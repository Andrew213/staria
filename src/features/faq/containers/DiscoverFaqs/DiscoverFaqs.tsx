'use client';

import type { PopulateFaq } from '@/types';

import { data } from './constants';
import { DiscoverGrid } from '../../components';

interface Props {
  faqs: PopulateFaq[];
}

export function DiscoverFaqs({ faqs }: Props) {
  return <DiscoverGrid items={faqs} linkTitle={data.linkTitle} />;
}
