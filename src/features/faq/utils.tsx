import React from 'react';

import type { FaqTextChild, ListChild } from '@/types';

export const getContent = (textPreview: FaqTextChild[] | string | null, parent?: ListChild) => {
  if (typeof textPreview === 'string') {
    return textPreview;
  }
  return textPreview?.length
    ? textPreview.map((x, index) => {
        switch (x.type) {
          case 'text': {
            return x.text ? <React.Fragment key={index}>{x.text}</React.Fragment> : <br key={index} />;
          }

          case 'paragraph': {
            return <p key={index}>{getContent(x.children)}</p>;
          }

          case 'list': {
            return (
              <ul key={index} className="mb-1 list-disc pl-5 text-gray-600 last:mb-0">
                {getContent(x.children, x)}
              </ul>
            );
          }

          case 'list-item': {
            return parent && parent.format === 'ordered' ? (
              <ol key={index}>{getContent(x.children)}</ol>
            ) : (
              <li key={index}>{getContent(x.children)}</li>
            );
          }
        }
      })
    : undefined;
};
