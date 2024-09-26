import {
  USAIcon,
  GeorgiaIcon,
  GermanyIcon,
  SwitzerlandIcon,
  NetherlandsIcon,
  BelgiumIcon,
  FranceIcon,
} from '@/assets/icons';

export const data = [
  {
    country: 'USA',
    city: 'Colorado',
    icon: USAIcon,
    markerPosition: {
      top: 'top-[35.2%]',
      left: 'left-[18.3%]',
    },
  },
  {
    country: 'Georgia',
    city: 'Tbilisi',
    icon: GeorgiaIcon,
    markerPosition: {
      top: 'top-[34%]',
      left: 'left-[58%]',
    },
  },
  {
    country: 'Germany',
    city: 'Munchen',
    icon: GermanyIcon,
    markerPosition: {
      top: 'top-[32.5%]',
      left: 'left-[53%]',
    },
  },
  {
    country: 'Switzerland',
    city: 'Lausanne',
    icon: SwitzerlandIcon,
    markerPosition: {
      top: 'top-[33%]',
      left: 'left-[49.5%]',
    },
  },
  {
    country: 'Netherlands',
    city: 'Rotterdam',
    icon: NetherlandsIcon,
    markerPosition: {
      top: 'top-[27%]',
      left: 'left-[48%]',
    },
  },
  {
    country: 'Belgium',
    city: 'Brussels',
    icon: BelgiumIcon,
    markerPosition: {
      top: 'top-[27%]',
      left: 'left-[51%]',
    },
  },
  {
    country: 'France',
    city: 'Montpellier',
    icon: FranceIcon,
    markerPosition: {
      top: 'top-[31.5%]',
      left: 'left-[46%]',
    },
  },
] as const;
