'use client';

import cn from 'classnames';
import type { HTMLReactParserOptions, DOMNode } from 'html-react-parser';
import parse, { Element } from 'html-react-parser';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

import { getTextContent } from '@/lib/components/PostContent/PostContent';
import { toKebabCase } from '@/utils';

interface Props {
  postHtml: string;
  showTeamTab?: boolean;
}

export function ReadMoreMenu({ postHtml, showTeamTab }: Props) {
  const [menuItems, setMenuItems] = useState<{ title: string; link: string }[]>([]);
  const [activeItemId, setActiveItemId] = useState<string>();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash) {
        const elementId = hash.substring(1);
        setActiveItemId(elementId);
      }
    };

    handleHashChange();
  }, [pathname, searchParams]);

  const menuParser: HTMLReactParserOptions = useMemo(
    () => ({
      replace(domNode) {
        if (domNode instanceof Element && domNode.attribs) {
          const { children: rawChildren, name } = domNode;
          const children = rawChildren as DOMNode[];

          if (name === 'h2') {
            setMenuItems((items) => {
              const item = items.find((x) => x.title === getTextContent(children));
              if (item) {
                return items;
              }
              const newItems = [
                ...items,
                {
                  title: getTextContent(children),
                  link: `#${toKebabCase(getTextContent(children))}`,
                },
              ];
              return newItems;
            });
          }
        }
      },
    }),
    [],
  );

  useEffect(() => {
    if (postHtml) {
      parse(postHtml, menuParser);
    }
    if (showTeamTab) {
      setMenuItems((prev) => [...prev, { title: 'Team', link: '#team' }]);
    }
  }, [postHtml, menuParser, showTeamTab]);

  return (
    <div className="-mx-20 mb-6 mt-5 grow overflow-hidden lg:mx-0 lg:mt-7 lg:grow">
      <ul className="scrollbar-hidden flex overflow-auto px-20 lg:flex-wrap lg:px-0">
        {menuItems.map((el, index) => {
          const isFirst = index === 0;
          const isLast = index === menuItems.length - 1;
          return (
            <li key={el.link}>
              <Link
                className={cn(
                  'inline-block whitespace-nowrap border border-gray-300 px-4 py-2.5 text-sm text-gray-700 shadow-button-xs dark:border-gray-blue-500 dark:text-gray-blue-50',
                  {
                    'border-r-none rounded-l-2': isFirst,
                    'border-l-none rounded-r-2': isLast,
                    'bg-gray-50 text-gray-800 dark:bg-downriver dark:text-white': activeItemId
                      ? el.link === `#${activeItemId}`
                      : isFirst,
                  },
                )}
                href={el.link}
              >
                {el.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
