import type { Color as BadgeColor } from '@/lib/components/Badge/Badge';
import type { Color as ButtonColor } from '@/lib/components/Button/Button';

export interface Plan {
  title: string;
  id: 'basic' | 'genesis' | 'genesis-plus';
  topTitle?: { text: string; color: string };
  price: number;
  periodCrossed?: string;
  period: string;
  periodColor?: string;
  description: string;
  buttonColor: ButtonColor;
  buttonText: string;
  badge?: {
    color: BadgeColor;
    text: string;
  };
  features: {
    title: string;
    value?: string;
    included: boolean;
    description: string;
    isTitleReversed?: boolean;
  }[];
}
