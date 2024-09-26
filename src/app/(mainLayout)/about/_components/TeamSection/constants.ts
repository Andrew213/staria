import { XIcon, LinkedInIcon } from '@/assets/icons';
import { IMAGES_CDN_URL } from '@/env';

export const data = {
  content: {
    subheading: 'Let\u2019s connect!',
    heading: 'Meet our team',
    supportingText:
      'Our approach is rooted in excellence. At Staria, we believe that our collective expertise and passion are the keys to bringing innovation to crypto investments.',
  },
  cards: [
    {
      id: '7',
      image: {
        src: `${IMAGES_CDN_URL}/alexandre.png`,
        alt: 'Alexandre Orfevre',
        width: 96,
        height: 96,
      },
      name: 'Alexandre Orfevre',
      role: 'Founder',
      supportingText: 'Ex CTO @ DAOMaker. 20+ years in entrepreneurship. Angel investor since 2017.',
      socials: [
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/aorfevre/',
          Icon: LinkedInIcon,
        },
        {
          id: 'x',
          href: 'https://x.com/intent/follow?screen_name=aorfevre',
          Icon: XIcon,
        },
      ],
    },

    {
      id: '2',
      image: {
        src: `${IMAGES_CDN_URL}/bob-jansen.png`,
        alt: 'Bob Jansen',
        width: 96,
        height: 96,
      },
      name: 'Bob Jansen',
      role: 'Head of Development',
      supportingText: '15+ years as Software Engineer, Data Analyst, Infonomics and System Design.',
      socials: [
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/bbjansen',
          Icon: LinkedInIcon,
        },
      ],
    },
    {
      id: '3',
      image: {
        src: `${IMAGES_CDN_URL}/michael-berclaz.png`,
        alt: 'Michael Berclaz',
        width: 96,
        height: 96,
      },
      name: 'Michael Berclaz',
      role: 'Head of Compliance',
      supportingText: 'Compliance officer accredited by FINMA for over 100 different companies',
      socials: [
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/michaelberclaz/',
          Icon: LinkedInIcon,
        },
      ],
    },
    {
      id: '8',
      image: {
        src: `${IMAGES_CDN_URL}/christophe.png`,
        alt: 'Christophe Debauve',
        width: 96,
        height: 96,
      },
      name: 'Christophe Debauve',
      role: 'Head of Product',
      supportingText: '20+ years experience in Product Design : AIOTI.eu - Ex DaoMaker - CyberArena ',
      socials: [
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/chrisdebauve/',
          Icon: LinkedInIcon,
        },
      ],
    },
    {
      id: '9',
      image: {
        src: `${IMAGES_CDN_URL}/dinoza.png`,
        alt: 'Dilnoza Shaumarova',
        width: 96,
        height: 96,
      },
      name: 'Dilnoza Shaumarova',
      role: 'Head of Marketing',
      supportingText: '10+ years experience in Startups : Ex DaoMaker - WomenWhoTech',
      socials: [
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/dilnoza-shaumarova/',
          Icon: LinkedInIcon,
        },
      ],
    },
    {
      id: '1',
      image: {
        src: `${IMAGES_CDN_URL}/charly-muziotti.png`,
        alt: 'Charly Muziotti',
        width: 96,
        height: 96,
      },
      name: 'Charly Muziotti',
      role: 'Head of Operations',
      supportingText: 'Former co-founder of HyperGrowth in the crypto industry since 7 years.',
      socials: [
        {
          id: 'x',
          href: 'https://x.com/intent/follow?screen_name=charlymcrypto',
          Icon: XIcon,
        },
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/charly-muziotti/',
          Icon: LinkedInIcon,
        },
      ],
    },

    {
      id: '5',
      image: {
        src: `${IMAGES_CDN_URL}/alejandro-granados.png`,
        alt: 'Alejandro Granados',
        width: 96,
        height: 96,
      },
      name: 'Alejandro Granados',
      role: 'SEO Expert',
      supportingText: 'Web2 and Web3 SEO Expert building organic growth strategies',
      socials: [
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/alejandro-granados-364238140/',
          Icon: LinkedInIcon,
        },
      ],
    },

    {
      id: '6',
      image: {
        src: `${IMAGES_CDN_URL}/joel-bracher.png`,
        alt: 'Joel Bracher',
        width: 96,
        height: 96,
      },
      name: 'Joel Bracher',
      role: 'Financial Advisor',
      supportingText: '20+ years experience in Trade Finance : Swiss Banks & Commodity Trading firms.',
      socials: [
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/joelbracher/',
          Icon: LinkedInIcon,
        },
      ],
    },
    {
      id: '4',
      image: {
        src: `${IMAGES_CDN_URL}/jeremy.png`,
        alt: 'Jeremy Heimbinder',
        width: 96,
        height: 96,
      },
      name: 'Jeremy Heimbinder',
      role: 'Copywriter',
      supportingText: 'Former Copywriter for Web2 and Web3 projets. 5 years experience in the industry.',
      socials: [
        {
          id: 'linked-in',
          href: 'https://www.linkedin.com/in/jeremyisidore/',
          Icon: LinkedInIcon,
        },
      ],
    },
  ],
} as const;
