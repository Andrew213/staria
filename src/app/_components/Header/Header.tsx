'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { RemoveScroll } from 'react-remove-scroll';

import { PageBanner } from '@/app/_components';
import { Logo } from '@/assets/icons';
import NoSsr from '@/core/NoSsr/NoSsr';
import { useNotification } from '@/features/notificationNavbar';
import { Button } from '@/lib/components';

import { CloseButton } from './components/CloseButton/CloseButton';
import { HamburgerButton } from './components/HamburgerButton/HamburgerButton';
import { applyButton, signinButton, signupButton, navLinks, authenticatedLinks } from './constants';
import { MainNav } from '../MainNav/MainNav';
import { MobileNav } from '../MobileNav/MobileNav';
import { UserNav } from '../UserNav/UserNav';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isUserClosed, notificationHeight } = useNotification();
  const isNotificationShown = isUserClosed !== true && isUserClosed !== 'initializing';

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const session = useSession();

  const [navHeight, setNavHeight] = useState(0);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (navRef.current) {
        setNavHeight(navRef.current.offsetHeight);
      }
    });

    if (navRef.current) {
      observer.observe(navRef.current);
    }

    return () => {
      if (navRef.current) {
        observer.unobserve(navRef.current);
      }
    };
  }, [isNotificationShown, showNavbar, navRef.current?.offsetHeight]);

  const toggleNavbar = useCallback(() => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY && window.scrollY > navHeight) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    }
  }, [lastScrollY, navHeight]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', toggleNavbar);

      return () => {
        window.removeEventListener('scroll', toggleNavbar);
      };
    }
  }, [lastScrollY, toggleNavbar]);

  return (
    <NoSsr>
      <div
        style={{
          paddingTop: navHeight,
        }}
      >
        <div
          ref={navRef}
          className="fixed z-40 w-screen transition-all"
          style={{
            top: showNavbar ? 0 : -navHeight,
          }}
        >
          <PageBanner />
          <div className="flex justify-center bg-white py-2.5 lg:py-2 dark:border-b dark:border-b-gray-blue-800 dark:bg-midnight">
            <div className="flex w-full max-w-screen-xl justify-between pl-4 lg:px-8">
              <div className="flex items-center gap-10">
                <Link href="/">
                  <Logo className="w-[141px] text-gray-800 lg:w-[207px] dark:text-white" />
                </Link>
                <div className="hidden lg:block">
                  <MainNav links={navLinks} />
                </div>
              </div>
              {session.status === 'authenticated' && <UserNav />}
              {session.status === 'unauthenticated' && (
                <div className="hidden items-center gap-3 lg:flex">
                  <Button content={signinButton.text} href={signinButton.href} size="lg" color="secondary-gray" />
                  <Button content={signupButton.text} href={signupButton.href} size="lg" color="primary" />
                </div>
              )}

              <div className="z-40 lg:hidden">
                <div className={isMenuOpen ? 'hidden' : ''}>
                  <HamburgerButton onClick={() => setIsMenuOpen(true)} />
                </div>
                <div className={isMenuOpen ? '' : 'hidden'}>
                  <CloseButton onClick={() => setIsMenuOpen(false)} />
                </div>
              </div>
            </div>
          </div>

          {isMenuOpen && (
            <RemoveScroll>
              <div
                className="fixed inset-0 z-30 flex h-full flex-col bg-white lg:hidden"
                style={{ top: notificationHeight }}
              >
                <div className="flex justify-center py-2.5 lg:py-2">
                  <div className="flex w-full max-w-screen-xl justify-between pl-4 pr-3 lg:px-8">
                    <div className="flex h-14 items-center gap-10">
                      <Link href="/">
                        <Logo className="w-[141px] text-gray-800 lg:w-[207px]" />
                      </Link>
                      <div className="hidden lg:block">
                        <MainNav links={navLinks} />
                      </div>
                    </div>
                    <div className="hidden items-center gap-3 lg:flex">
                      <Button content={applyButton.text} href={applyButton.href} size="md" color="primary" />
                    </div>
                    <div className="hidden items-center gap-3 lg:flex">
                      <Button content={signinButton.text} href={signinButton.href} size="lg" color="secondary-gray" />
                      <Button content={signupButton.text} href={signupButton.href} size="lg" color="primary" />
                    </div>
                  </div>
                </div>
                <div className="flex grow flex-col">
                  <MobileNav
                    links={session.status === 'authenticated' ? authenticatedLinks : navLinks}
                    onLinkClick={() => setIsMenuOpen(false)}
                  />
                  {session.status === 'unauthenticated' && (
                    <div
                      className="absolute flex w-full flex-col items-stretch gap-3 border-t border-gray-200 px-4 py-6"
                      style={{ bottom: showNavbar ? notificationHeight : 0 }}
                    >
                      <Button content={signinButton.text} href={signinButton.href} size="lg" color="secondary-gray" />
                      <Button content={signupButton.text} size="lg" href={signupButton.href} color="primary" />
                    </div>
                  )}
                </div>
              </div>
            </RemoveScroll>
          )}
        </div>
      </div>
    </NoSsr>
  );
}
