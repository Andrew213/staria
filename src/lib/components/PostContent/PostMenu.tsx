import type { ReactNode } from 'react';

import { Link } from '@/lib/components';

interface Props {
  menuTitle: string;
  menuItems: { title: string; link: string }[];
  footerSlot?: ReactNode;
}

export function PostMenu({ menuTitle, menuItems, footerSlot = null }: Props) {
  return (
    <div className="sticky top-40 flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <p className="text-md font-semibold text-primary-600">{menuTitle}</p>
        <ul className="flex flex-col gap-3">
          {menuItems.map(({ title, link }) => (
            <li key={link}>
              <Link href={link} content={title} size="lg" color="gray" />
            </li>
          ))}
        </ul>
      </div>
      <div className="border-b border-gray-200"></div>
      {footerSlot}
    </div>
  );
}
