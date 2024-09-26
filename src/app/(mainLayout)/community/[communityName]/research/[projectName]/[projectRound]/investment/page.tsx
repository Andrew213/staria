import { notFound } from 'next/navigation';

import dealsApi from '@/api/DealsApi';
import { ProjectInvestment } from '@/app/_shared';

export default async function Page({
  params: { dealName, dealRound },
}: {
  params: { dealName: string; dealRound: string };
}) {
  const deal = await dealsApi.fetchDeal(dealName, dealRound);

  return deal ? <ProjectInvestment project={deal} /> : notFound();
}
