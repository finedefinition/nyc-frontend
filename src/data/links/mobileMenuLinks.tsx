import { SplitCurrencyLink } from '@/components/Shared/SplitCurrencyLink';
// import { LinkProps } from '@/interfaces/clickable.interface';

// interface MobileMenuLinksArray extends LinkProps {
//   text: string | JSX.Element;
// }

export const mobileMenuLinks = [
  {
    text: 'Yachts',
    href: '/catalogue',
  },
  {
    text: 'How it Works?',
    href: '/how-it-works',
  },
  {
    text: 'My account',
    href: '',
  },
  {
    text: 'Contacts',
    href: '/contacts',
  },
  {
    text: <SplitCurrencyLink />,
    href: '',
  },
];
