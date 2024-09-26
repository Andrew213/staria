import { IMAGES_CDN_URL } from '@/env';

export const data = {
  subheading: 'Our Philosophy',
  heading: 'Compliance first. Trust before all',
  supportingText: [
    "In the ever-expanding realm of cryptocurrencies and investments, compliance is often an afterthought for many projects. At Staria Network, we see things differently. We believe that adhering to AML (Anti-Money Laundering) rules will give us a competitive edge in the long run, so we've embraced this challenge head-on.",
    "To ensure we meet the stringent requirements for AML compliance in Switzerland, one of the world's most reputable financial hubs, we've actively engaged with government authorities. Our commitment to transparency and trust doesn't stop there. We've cultivated a robust network of over 100 venture capitals, launchpads, and industry leaders to bolster our deal flow.",
    'Know Your Business (KYB) checks and due diligence, conducted by both our team and an independent third-party investigator. The findings from these external assessments are shared publicly, reinforcing our dedication to maintaining the highest standards of integrity and openness.',
  ],
  buttonText: 'Get in touch',
  image: {
    mobile: `${IMAGES_CDN_URL}/abstract-balls-mobile.png`,
    desktop: `${IMAGES_CDN_URL}/abstract-balls-desktop.png`,
    alt: 'Our Philosophy',
  },
} as const;
