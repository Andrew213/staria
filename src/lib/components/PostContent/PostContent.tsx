'use client';
import type { HTMLReactParserOptions, DOMNode } from 'html-react-parser';
import parse, { Element, domToReact, Text } from 'html-react-parser';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';

import { useBreakpoint } from '@/lib/hooks';

import { Blockquote, Conclusion, Intro, List, MainTitle, Paragraph, Picture, SecondaryTitle } from './postElements';
import { PostMenu } from './PostMenu';

interface Props {
  postHtml: string;
  menu?: { title: string } | null;
  socialsSlot?: ReactNode;
}

export function PostContent({ postHtml, menu = null, socialsSlot = null }: Props) {
  const [menuItems, setMenuItems] = useState<{ title: string; link: string }[]>([]);
  const [parsedHtml, setParsedHtml] = useState<ReactNode>(null);
  const [isClient, setIsClient] = useState(false);
  const { isAboveLg } = useBreakpoint('lg');

  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash) {
        const elementId = hash.substring(1);
        const element = document.getElementById(elementId);

        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    handleHashChange();
  }, [pathname, searchParams]);

  const menuParser: HTMLReactParserOptions = useMemo(
    () => ({
      replace(domNode) {
        try {
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
                    link: `#${domNode.attribs.id}`,
                  },
                ];
                return newItems;
              });
            }
          }
        } catch (error) {
          console.error('Error in menuParser:', error);
        }
      },
    }),
    [],
  );

  useEffect(() => {
    if (!menu) return;
    try {
      parse(postHtml, menuParser);
    } catch (error) {
      console.error('Error parsing post HTML:', error);
    }
  }, [postHtml, menu, menuParser]);

  useEffect(() => {
    try {
      const result = parse(postHtml, htmlParser);
      setParsedHtml(result);
    } catch (error) {
      console.error('Error parsing post HTML:', error);
      setParsedHtml(<div>Error rendering content</div>);
    }
  }, [postHtml]);

  if (!isClient) {
    return null;
  }

  return (
    <div className="w-full gap-16 pb-16 lg:flex lg:pb-24">
      {isAboveLg && menu && (
        <div className="w-70 shrink-0">
          <PostMenu menuTitle={menu.title} menuItems={menuItems} footerSlot={socialsSlot} />
        </div>
      )}
      <div className="grow">{parsedHtml}</div>
      {!isAboveLg && socialsSlot}
    </div>
  );
}

const conclusionParser: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {
      const { children: rawChildren, name } = domNode;
      const children = rawChildren as DOMNode[];

      if (name === 'h2') {
        return (
          <h2
            className="mb-4 text-display-xs font-semibold text-gray-900 lg:mb-5 lg:text-display-sm"
            id={getTextContent(children)}
          >
            {domToReact(children)}
          </h2>
        );
      }

      return domToReact(children);
    }
  },
};

const htmlParser: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {
      const { attribs, children: rawChildren, name } = domNode;
      const children = rawChildren as DOMNode[];

      if (name === 'h2') {
        return <MainTitle id={domNode.attribs.id}>{domToReact(children)}</MainTitle>;
      }

      if (name === 'h3') {
        return <SecondaryTitle id={domNode.attribs.id}>{domToReact(children)}</SecondaryTitle>;
      }

      if (attribs.class === 'intro') {
        return <Intro>{domToReact(children)}</Intro>;
      }

      if (attribs.class === 'conclusion') {
        return <Conclusion>{domToReact(children, conclusionParser)}</Conclusion>;
      }

      if (name === 'ul' || name === 'ol') {
        return <List type={name}>{domToReact(children)}</List>;
      }

      if (name === 'figure') {
        return <Picture>{domToReact(children)}</Picture>;
      }

      if (name === 'blockquote') {
        return <Blockquote>{domToReact(children)}</Blockquote>;
      }

      if (name === 'p') {
        return <Paragraph>{domToReact(children, htmlParser)}</Paragraph>;
      }
    }
  },
};

export function getTextContent(elem: DOMNode[] | string): string {
  if (typeof elem === 'string') {
    return elem;
  }

  return elem
    .map((x) => {
      if (x instanceof Text) {
        return x.data;
      }

      if (x instanceof Element) {
        return getTextContent(x.children as DOMNode[]);
      }
    })
    .join('');
}
