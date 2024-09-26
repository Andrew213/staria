import { notFound } from 'next/navigation';

import dealsApi from '@/api/DealsApi';
import { ProjectInvestment } from '@/app/_shared';

export default async function Page({
  params: { projectName, projectRound },
}: {
  params: { projectName: string; projectRound: string };
}) {
  const deal = await dealsApi.fetchDeal(projectName, projectRound);

  return deal ? <ProjectInvestment project={deal} /> : notFound();
}
