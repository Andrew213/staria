import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRightIcon } from '@/assets/icons';

interface Props {
  href: string;
  heading: string;
  supportingText: string;
  publish: {
    heading: string;
    date: string;
  };
  categories: {
    heading: string;
    list: string[];
  };
  image: string;
  imageAlt: string;
}

export function FeaturedCard({ href, heading, supportingText, publish, categories, image, imageAlt }: Props) {
  return (
    <Link className="relative flex aspect-[1216/720] flex-col overflow-hidden rounded-4" href={href}>
      <div className="relative size-full">
        <Image className="object-cover" src={image} alt={imageAlt} fill />
      </div>
      <div className="absolute inset-0 flex flex-col justify-end">
        <div className="bg-[linear-gradient(180deg,rgba(0,0,0,0.00)_0%,rgba(0,0,0,0.40)_100%)] pt-24">
          <div className="flex flex-col gap-6 p-8 text-white">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between gap-4">
                <p className="text-display-xs font-semibold">{heading}</p>
                <div className="size-6 stroke-white">
                  <ArrowUpRightIcon />
                </div>
              </div>
              <p className="font-rubik text-md">{supportingText}</p>
            </div>
            <div className="flex justify-between gap-6">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">{publish.heading}</p>
                <p className="text-nowrap py-2 text-md font-semibold">{publish.date}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm font-semibold">{categories.heading}</p>
                <div className="flex flex-wrap gap-x-2">
                  {categories.list.map((category, i) => (
                    <div key={category + i} className="py-2">
                      <div className="flex items-center justify-center rounded-4 border-[1.5px] border-white px-2.5">
                        <p className="text-sm font-medium">{category}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
