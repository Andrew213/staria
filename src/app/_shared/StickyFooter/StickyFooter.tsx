'use client';
import cn from 'classnames';
import { useCallback, useEffect, useRef, useState } from 'react';

import { ChevronDownIcon } from '@/assets/icons';

import { data } from './constants';

interface Props {
  title?: React.ReactNode;
  active?: number | boolean;
  content: React.ReactNode;
}

export function StickyFooter({ title, active, content }: Props) {
  const [isSticky, setIsSticky] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [shouldTransition, setShouldTransition] = useState(false);
  const footerRef = useRef(null);
  const placeholderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (footerRef.current && placeholderRef.current) {
        const footerBottom = placeholderRef.current.getBoundingClientRect().top;
        if (footerBottom < 0) {
          setIsSticky(true);
        } else {
          setIsSticky(false);
          setIsOpen(false);
        }

        if (shouldTransition) {
          setShouldTransition(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [shouldTransition]);

  const handleHeaderClick = useCallback(() => {
    setIsOpen((prev) => !prev);
    setShouldTransition(true);
  }, []);

  return (
    <div
      className={cn('relative', {
        'z-[9999]': isSticky,
      })}
    >
      <div
        ref={footerRef}
        className={`${isSticky ? 'fixed inset-x-0 bottom-0 bg-downriver p-4' : 'static'} transition-none`}
      >
        {isSticky && (
          <div onClick={handleHeaderClick} className="flex items-center justify-between">
            {!active && (
              <div className="flex flex-col">
                <p className="text-lg font-semibold text-white">{data.comingSoonTitle}</p>
                <p className="text-xs font-medium text-white">{data.comingSoonSubTitle}</p>
              </div>
            )}
            {active && (
              <div className="flex gap-3">
                <div
                  className={cn(
                    'color-white flex size-12 items-center justify-center rounded-full border border-gray-25 bg-primary-500 text-xl font-bold text-white',
                  )}
                >
                  {active}.
                </div>
                <div className="flex flex-col">
                  <p className="text-lg font-semibold text-white">{title}</p>
                  <p className="text-xs font-medium text-white">{data.activeSubTitle}</p>
                </div>
              </div>
            )}
            <div
              className={cn('size-6 text-white transition', {
                'rotate-180': !isOpen,
              })}
            >
              <ChevronDownIcon />
            </div>
          </div>
        )}
        <div
          className={cn('overflow-hidden', {
            'max-h-0': !isOpen && isSticky,
            'max-h-[1000px]': isOpen || !isSticky,
            'mb-2 mt-6': isOpen && isSticky,
            'transition-max-height duration-300': shouldTransition,
          })}
        >
          <div
            className={cn({
              'opacity-0': !isOpen && isSticky,
              'opacity-100': isOpen || !isSticky,
              'transition-opacity duration-300': shouldTransition,
            })}
          >
            {content}
          </div>
        </div>
      </div>
      <div ref={placeholderRef} className="h-0" />
    </div>
  );
}
