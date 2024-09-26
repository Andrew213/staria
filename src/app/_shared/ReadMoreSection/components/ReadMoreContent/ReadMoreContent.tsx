'use client';

import parse from 'html-react-parser';

import type { DealMember } from '@/app/_shared/types';
import { projectParser } from '@/utils/projectParser';

import { ReadMoreMenu, TeamSection } from './components';

interface Props {
  text: string;
  name: string;
  members: DealMember[];
  ticker: string;
}

export function ReadMoreContent({ text, name, members, ticker }: Props) {
  return (
    <div className="overflow-visible">
      <ReadMoreMenu showTeamTab={!!members.length} postHtml={text} />
      <div className="grow">
        <div>{parse(text, projectParser)}</div>
        {members.length > 0 && <TeamSection ticker={ticker} name={name} members={members} />}
      </div>
    </div>
  );
}
