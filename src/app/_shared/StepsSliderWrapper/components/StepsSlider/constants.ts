import { IMAGES_CDN_URL } from '@/env';
import { routes } from '@/routes';

const secondStepImageData = {
  url: `${IMAGES_CDN_URL}/man-typing-on-the-phone.jpeg`,
  width: 4096,
  height: 2731,
};

export const sliderItems = [
  {
    title: '1. Sign Up/Log in',
    description: "Create your account or simply Log in. It's quick and easy.",
    link: 'Start Here',
    imageData: {
      light: {
        url: `${IMAGES_CDN_URL}/registration-page.png`,
        width: 1051,
        height: 702,
      },
      dark: {
        url: `${IMAGES_CDN_URL}/registration-page-in-dark-mode.png`,
        width: 1370,
        height: 910,
      },
    },
    imageAlt: 'Sign Up/Log in',
  },
  {
    title: '2. Pass your KYC',
    description:
      'Complete the KYC process to verify your identity. This ensures a secure and compliant environment for everyone.',
    imageData: {
      light: secondStepImageData,
      dark: secondStepImageData,
    },
    imageAlt: 'Pass your KYC',
  },
  {
    title: '3. Participate in Sales',
    description:
      "Once verified, you can join various pools and start investing in exciting projects right away. It's as simple as that!",
    imageData: {
      light: {
        url: `${IMAGES_CDN_URL}/project-page.png`,
        width: 1670,
        height: 1082,
      },
      dark: {
        url: `${IMAGES_CDN_URL}/project-page-in-dark-mode.png`,
        width: 1604,
        height: 996,
      },
    },
    imageAlt: 'Participate in Sales',
  },
];

export const linkTitle = 'Start here';
export const linkUrl = routes.signup.getRedirectPath();
