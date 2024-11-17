'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import NavbarFooterLogo from '@/components/SvgIcons/NavbarFooterLogo';

import {
  navbarLeftLinks,
  NavbarLinksInterface,
  navbarRightLinks,
} from '@/data/links/navbarLinks';

import MenuAndCloseButton from './MenuAndCloseButton';

const NavbarLinks = () => {
  const searchParams = useSearchParams();
  const modal = searchParams.get('modal');

  const renderLinks = (links: NavbarLinksInterface[], isLeft: boolean) => {
    return links.map((link, i) => (
      <li
        key={i}
        className={`${
          isLeft
            ? 'mr-9 last:mr-0 hidden xl:flex'
            : `ml-9 first:ml-0 ${link.variant === 'nav' && 'hidden xl:flex'}`
        }`}
      >
        <ClickableComponent
          href={link.href}
          variants={['link']}
        >
          {link.text}
        </ClickableComponent>
      </li>
    ));
  };

  return (
    <>
      <ul className="flex justify-start">
        <li className="mr-3 flex xl:hidden">
          <Suspense fallback={null}>
            <MenuAndCloseButton modal={modal} />
          </Suspense>
        </li>
        {renderLinks(navbarLeftLinks, true)}
      </ul>
      <span className="flex justify-center">
        <ClickableComponent href="/">
          <NavbarFooterLogo navbar />
        </ClickableComponent>
      </span>
      <ul className="flex justify-end highlight-second">
        {renderLinks(navbarRightLinks, false)}
      </ul>
    </>
  );
};

export default NavbarLinks;
