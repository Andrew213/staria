'use client';

import { usePathname } from 'next/navigation';
import { useRef, useEffect } from 'react';

import { CONTACT_FORM_LINK } from '@/env';
import { ContactForm } from '@/features/contactForm/containers/ContactForm';

import { data } from './constants';

export function ContactUsSection() {
  const pathname = usePathname();
  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash.substring(1) === CONTACT_FORM_LINK && containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [pathname]);

  return (
    <div className="flex items-center justify-center gap-16 py-0 xl:py-16 xl:pb-24">
      <div className="flex w-full flex-col gap-12 px-4 py-16 xs:max-w-[550px] xl:px-12 xl:py-11" ref={containerRef}>
        <div className="flex flex-col gap-5 xs:gap-4">
          <p className="text-display-md font-semibold text-gray-900">{data.title}</p>
          <p className="font-rubik text-lg font-normal text-gray-600 xl:text-xl">{data.subtitle}</p>
        </div>
        <ContactForm />
      </div>

      <div className="hidden h-[800px] w-[576px] bg-[url(https://cdn.staria.network/cdn-cgi/image/format=auto/assets/images/contact-bg.png)] bg-cover bg-no-repeat xl:block" />
    </div>
  );
}
