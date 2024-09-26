import { IMAGES_CDN_URL } from '@/env';
import { routes } from '@/routes';

export const data = {
  title: 'Limited Early Bird Genesis+ Discount',
  benefitsList: ['Access all our Offering Pools', 'Get Guaranteed Allocations', 'Receive VIP Deals'],
  price: '3000',
  period: 'For Life',
  periodCrossed: 'Per Year',
  description: 'When it’s gone, it’s gone! Our special Early Bird offer for our first 360 users.',
  buttonText: 'Get Genesis+',
  mobileButtonText: 'Get Genesis+',
  href: routes.signup.getRedirectPath(),
  labelText: '',
  sliderItems: [
    {
      id: '1',
      imageUrl: `${IMAGES_CDN_URL}/joel.jpeg`,
      imageAlt: '',
      title: '“Step forward with confidence. Staria offers unique investment opportunities hard to find elsewhere.”',
      name: 'Joel Bracher',
      role: 'Swiss Financial Advisor',
      companyName: '',
    },
    {
      id: '2',
      imageUrl: `${IMAGES_CDN_URL}/amro.png`,
      imageAlt: '',
      title:
        "“Web3's early-stage capital should rely on regulated, transparent platforms. Staria disrupts this cycle positively.”",
      name: 'Amro Shihadah',
      role: 'Founder of Velocity DAO',
      companyName: '',
    },
  ],
};
