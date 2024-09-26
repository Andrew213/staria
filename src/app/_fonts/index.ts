import { Rubik } from 'next/font/google';
import localFont from 'next/font/local';

const ruberoid = localFont({
  src: [
    {
      path: './ruberoid-medium.woff2',
      weight: '500',
    },
    {
      path: '/ruberoid-medium-oblique.woff2',
      weight: '500',
      style: 'oblique',
    },
    {
      path: '/ruberoid-semibold.woff2',
      weight: '600',
    },
    {
      path: '/ruberoid-bold.woff2',
      weight: '700',
    },
  ],
  variable: '--staria-font-ruberoid',
});
const rubik = Rubik({
  subsets: ['latin'],
  variable: '--staria-font-rubik',
});

export { ruberoid, rubik };
