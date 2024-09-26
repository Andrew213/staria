import { routes } from '@/routes';

export const data = {
  title: 'Limited Early Bird Genesis+ Discount',
  subtitle: 'When it’s gone, it’s gone! Our special Early Bird offer for our first 360 users.',
  price: '3000',
  period: 'For Life',
  periodCrossed: 'Per Year',
  benefitsList: ['Access all our Offering Pools', 'Get Guaranteed Allocations', 'Receive VIP Deals'],
  buttonText: 'Get Genesis+',
  href: routes.signup.getRedirectPath(),
  background: 'bg-kol-card',
} as const;
