'use client';

import cn from 'classnames';
import Link from 'next/link';
import { useState } from 'react';

interface Props {
  title: string;
  Icon: React.ReactNode;
  isActive?: boolean;
  setIsOpen?: (a: boolean) => void;
  isClickable?: boolean;
  href: string;
  hide: boolean;
}

export function MenuLink({ title, Icon, isActive, setIsOpen, href, isClickable = true, hide = false }: Props) {
  const [isHover, setIsHover] = useState(false);

  const handleMenuChange = () => {
    setIsOpen && setIsOpen(false);
  };
  return (
    <Link
      href={href}
      onClick={handleMenuChange}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      className={cn(
        'flex gap-3 rounded-1.5 px-3 py-[19px] text-gray-600 transition-colors duration-75 ease-in hover:bg-primary-500 hover:text-white dark:text-gray-blue-100',
        {
          'pointer-events-none dark:text-white': !isClickable,
          'text-white': isHover || isActive,
          'bg-primary-500': isActive,
          hidden: hide,
        },
      )}
    >
      <div className="size-5 cursor-pointer fill-black stroke-white lg:size-6">{Icon}</div>
      <p className="text-md">{title}</p>
    </Link>
  );
}
