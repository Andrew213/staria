import type { HTMLReactParserOptions, DOMNode } from 'html-react-parser';
import { Element, domToReact, Text } from 'html-react-parser';

import {
  MainTitle,
  SecondaryTitle,
  List,
  Picture,
  Blockquote,
  Paragraph,
  Link,
} from '@/lib/components/ProjectContent/projectElements';

import { toKebabCase } from './string';

export const projectParser: HTMLReactParserOptions = {
  replace(domNode) {
    if (domNode instanceof Element && domNode.attribs) {
      const { attribs, children: rawChildren, name } = domNode;
      const children = rawChildren as DOMNode[];

      if (name === 'h2') {
        return <MainTitle id={toKebabCase(getTextContent(children))}>{domToReact(children)}</MainTitle>;
      }

      if (name === 'h3') {
        return <SecondaryTitle id={toKebabCase(getTextContent(children))}>{domToReact(children)}</SecondaryTitle>;
      }

      if (name === 'ul') {
        return <List type={name}>{domToReact(children, projectParser)}</List>;
      }

      if (name === 'figure') {
        return <Picture>{domToReact(children, projectParser)}</Picture>;
      }

      if (name === 'blockquote') {
        return <Blockquote>{domToReact(children, projectParser)}</Blockquote>;
      }

      if (name === 'p') {
        return <Paragraph>{domToReact(children, projectParser)}</Paragraph>;
      }
      if (name === 'a') {
        return (
          <Link href={attribs.href} rel={attribs.rel} target={attribs.target}>
            {domToReact(children, projectParser)}
          </Link>
        );
      }
    }
  },
};

function getTextContent(elem: DOMNode[] | string): string {
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
