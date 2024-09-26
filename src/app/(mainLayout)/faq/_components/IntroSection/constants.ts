import FileIcon from '@/assets/icons/file-icon.svg';
import HeartIcon from '@/assets/icons/heart-icon.svg';
import SlashCircle01Icon from '@/assets/icons/slash-circle-01.svg';
import SwitchIcon from '@/assets/icons/switch-icon.svg';

export const data = {
  title: 'Frequently asked questions',
  description:
    'Everything you need to know about the product and billing. Can’t find the answer you’re looking for? Please [chat to our friendly team.]()',
  linkTitle: 'Learn more',
  items: [
    {
      title: 'Is there a free trial available?',
      description:
        'Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible. [Learn more]()',
      icon: HeartIcon,
      link: '/TODO-1',
    },
    {
      title: 'Can I change my plan later?',
      description:
        'Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you. [Learn more]()',
      icon: SwitchIcon,
      link: '/TODO-2',
    },
    {
      title: 'What is your cancellation policy?',
      description:
        'We understand that things change. You can cancel your plan at any time and we’ll refund you the difference already paid. [Learn more]()',
      icon: SlashCircle01Icon,
      link: '/TODO-3',
    },
    {
      title: 'Can other info be added to an invoice?',
      description: `At the moment, the only way to add additional information to invoices is to add the information to the workspace's name. [Learn more]()`,
      icon: FileIcon,
      link: '/TODO-4',
    },
  ],
};
