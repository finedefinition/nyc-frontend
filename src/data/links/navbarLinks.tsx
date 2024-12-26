import Heart from '@/components/SvgIcons/Heart';
import User from '@/components/SvgIcons/User';
// import SplitCurrencyLink from '@/components/Shared/SplitCurrencyLink';
import CurrencyDropdown from '@/components/MainLayout/Navbar/CurrencyDropdown';

// import { LinkProps } from '@/interfaces/clickable.interface';

// interface NavbarLinksArrays extends LinkProps {
//   text: string | JSX.Element;
// }

export interface NavbarLinksInterface {
  text: string | JSX.Element;
  href: string;
  variant: string;
}

export const navbarLeftLinks: NavbarLinksInterface[] = [
  {
    text: 'Yachts',
    href: '/catalogue',
    variant: 'nav',
  },
  {
    text: 'How it Works?',
    href: '/how-it-works',
    variant: 'nav',
  },
];

export const navbarRightLinks: NavbarLinksInterface[] = [
  {
    text: <Heart />,
    href: '/',
    variant: 'icon',
  },
  {
    text: <User />,
    href: '/',
    variant: 'icon',
  },
  // {
  //   text: <SplitCurrencyLink />,
  //   href: '?modal=currency',
  //   variant: 'nav',
  // },
  {
    text: <CurrencyDropdown />,
    href: '',
    variant: 'nav',
  },
  {
    text: 'Contacts',
    href: '/contacts',
    variant: 'nav',
  },
];
