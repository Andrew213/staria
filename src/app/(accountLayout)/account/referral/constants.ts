import type { RowData } from '@/app/_shared/SubscriptionPlanTable/constants';
import { referralTableRow } from '@/app/_shared/SubscriptionPlanTable/constants';
import { EARN_VIDEO_LINK } from '@/env';
import type { Plan } from '@/types';

export const data = {
  url: EARN_VIDEO_LINK,
  title: 'Upgrade your plan',
};

export const subscriptionTableRows: RowData[] = [referralTableRow];

export const plansData = [
  {
    title: 'Basic',
    link: '',
    id: 'basic' as Plan,
    index: 1,
  },
  {
    title: 'Genesis',
    link: '',
    id: 'genesis' as Plan,
    index: 2,
  },
  {
    title: 'Genesis +',
    link: '',
    id: 'genesis-plus' as Plan,
    index: 3,
  },
];
