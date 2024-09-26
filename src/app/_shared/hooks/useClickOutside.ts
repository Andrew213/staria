'use client';

import { useEffect } from 'react';

export default function useClickOutside<Ref extends React.RefObject<HTMLElement>>(
  ref: Ref,
  handler: (() => void) | undefined,
) {
  function handleDocumentClick(event: MouseEvent | TouchEvent) {
    if (ref.current && handler && !ref.current.contains(event.target as HTMLElement)) {
      handler();
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);
}
