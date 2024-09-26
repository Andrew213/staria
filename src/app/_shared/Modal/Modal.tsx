'use client';

import { useRef } from 'react';
import { createPortal } from 'react-dom';
import { RemoveScroll } from 'react-remove-scroll';
import { twJoin, twMerge } from 'tailwind-merge';

import { useClickOutside } from '@/app/_shared/hooks';
import { CrossIcon } from '@/assets/icons';
import { CDN_URL } from '@/env';

interface Props extends React.PropsWithChildren {
  theme?: 'default' | 'dots-background';
  closeButtonIsShown?: boolean;
  overlayClassName?: string;
  contentWrapperClassName?: string;
  onClose?: () => void;
}

export function Modal({
  theme = 'default',
  closeButtonIsShown,
  overlayClassName,
  contentWrapperClassName,
  children,
  onClose,
}: Props) {
  const contentWrapperRef = useRef<HTMLDivElement>(null);
  useClickOutside(contentWrapperRef, onClose);

  return createPortal(
    <div
      className={twMerge(
        'fixed inset-0 z-50 flex items-center justify-center bg-gray-900/70 p-4 lg:p-18',
        overlayClassName,
      )}
    >
      <RemoveScroll
        className={twMerge(
          'max-w-full',
          theme === 'dots-background' && 'w-100 rounded-3 bg-tangaroa bg-top bg-no-repeat p-6 shadow-xl',
          closeButtonIsShown ? 'relative' : 'max-h-full overflow-y-auto',
          contentWrapperClassName,
        )}
        style={
          theme === 'dots-background'
            ? {
                backgroundImage: `url(${CDN_URL}/cdn-cgi/image/format=auto/assets/images/BackgroundDecor.png)`,
              }
            : undefined
        }
        ref={contentWrapperRef}
      >
        {closeButtonIsShown && (
          <button
            className={twJoin('absolute', theme === 'default' && '-top-7.5 lg:-right-20 lg:-top-17.5')}
            type="button"
            aria-label="Close modal"
            onClick={onClose}
          >
            <CrossIcon className={twJoin(theme === 'default' && 'size-4 text-white lg:size-10')} />
          </button>
        )}
        {children}
      </RemoveScroll>
    </div>,
    document.body,
  );
}
