import type { Extension } from '@/types';

interface Field {
  title: string;
  subtitle: string;
  tooltip?: string;
  inputs: {
    placeholder: string;
    prefix?: string;
    name: string;
    maxLength?: number;
    type?: 'email' | 'text' | 'password';
    required?: boolean;
  }[];
  uploadInputs?: { name: string; title: string; extensions: Extension[]; width?: number; height?: number }[];
}

export const data = {
  title: 'Community Creation',
  subtitle: {
    text: 'Community profile',
    subText: 'Update your community details here.',
    buttonCancel: 'Cancel',
    buttonSave: 'Save',
  },
  fields: [
    {
      title: 'Community name',
      subtitle: 'This will be displayed on your profile.',
      inputs: [{ placeholder: 'Enter your community name', name: 'name', required: true }],
    },
    {
      title: 'Manager point of contact',
      subtitle: 'This will allow STARIA to discuss with you.',
      inputs: [
        { placeholder: 'Enter your email address', name: 'contactEmail', type: 'email', required: true },
        { placeholder: 'Enter your account', prefix: 'Telegram/', name: 'contactTelegram', required: true },
      ],
    },
    {
      title: 'Slugline',
      tooltip: 'A unique public identifier for your community',
      subtitle: 'A quick snapshot of your company.',
      inputs: [{ placeholder: 'Enter your slug', prefix: 'staria.network/community/', name: 'slug', required: true }],
    },
    {
      title: 'Community socials',
      subtitle: 'This will be displayed on your profile.',
      inputs: [
        { placeholder: 'Enter your website', prefix: 'https://', name: 'social_website' },
        { placeholder: 'Enter your account', prefix: 'twitter/', name: 'social_x' },
        { placeholder: 'Enter your account', prefix: 'Telegram/', name: 'social_telegram' },
        { placeholder: 'Enter your account', prefix: 'Discord/', name: 'social_discord' },
        { placeholder: 'Enter your account', prefix: 'linkedin/company/', name: 'social_linkedin' },
      ],
    },
    {
      title: 'Community logo',
      subtitle: 'Update your company logo and then choose where you want it to display.',
      uploadInputs: [
        {
          name: 'logoUrl',
          title: 'Main Logo',
          extensions: ['SVG', 'PNG', 'JPG', 'GIF'],
          width: 800,
          height: 400,
        },
        {
          name: 'iconUrl',
          title: 'Icon Logo',
          extensions: ['SVG', 'PNG', 'JPG', 'GIF'],
          width: 800,
          height: 400,
        },
      ],
    },
    {
      title: 'Short description',
      tooltip: 'A short description that will be displayed on the community page',
      subtitle: 'A quick snapshot of your community.',
      inputs: [{ placeholder: 'Enter small description', name: 'description', maxLength: 120, required: true }],
    },
  ] as Field[],
};

export const whitelisting = {
  title: 'Whitelisting Users',
  subtitle: 'Choose who can access your Community Deals.',
  field: {
    title: 'Whitelisting methods',
    subtitle: 'Chooose to whitelist users over referrals, wallet, email or NFT.',
    params: [
      {
        title: 'All your STARIA referrals',
        subtitle: 'All your STARIA referrals will be whitelisted',
        name: 'whitelistReferrals',
        checkbox_name: 'checkbox_whitelistReferrals',
      },
      {
        title: 'Wallet Addresses',
        subtitle: 'Upload .CSV file with wallet addresses in a single column with no header.',
        extensions: ['CSV'] as Extension[],
        maxSize: 4000,
        name: 'whitelist_wallet',
        checkbox_name: 'checkbox_wallet',
      },
      {
        title: 'Emails',
        subtitle: 'Upload .CSV file with email addresses in a single column with no header.',
        extensions: ['CSV'] as Extension[],
        maxSize: 4000,
        name: 'whitelist_email',
        checkbox_name: 'checkbox_email',
      },
      // {
      //   title: 'NFT Holders',
      //   subtitle: 'Enter your NFT contract address',
      //   placeholder: 'Enter your contract address ',
      //   name: 'nftContract',
      //   checkbox_name: 'checkbox_nft',
      //   Icon: FileCheck02,
      // },
    ],
  },
};
