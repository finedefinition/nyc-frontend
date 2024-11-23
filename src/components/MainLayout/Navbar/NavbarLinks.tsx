'use client';
import { Suspense } from 'react';

import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import NavbarFooterLogo from '@/components/SvgIcons/NavbarFooterLogo';

import {
  navbarLeftLinks,
  NavbarLinksInterface,
} from '@/data/links/navbarLinks';

import Heart from '@/components/SvgIcons/Heart';
import User from '@/components/SvgIcons/User';
import CurrencyDropdown from './CurrencyDropdown';
import MenuAndCloseButton from './MenuAndCloseButton';

const NavbarLinks = () => {
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
            <MenuAndCloseButton />
          </Suspense>
        </li>
        {renderLinks(navbarLeftLinks, true)}
      </ul>
      <span className="flex justify-center">
        <ClickableComponent href="/">
          <NavbarFooterLogo navbar />
        </ClickableComponent>
      </span>
      <ul className="flex justify-end items-center space-x-9">
        <ClickableComponent
          href="/contacts"
          className="hidden xl:block"
          variants={['link']}
        >
          Contacts
        </ClickableComponent>
        <div className="flex space-x-2">
          <ClickableComponent
            href=""
            variants={['link']}
          >
            <Heart />
          </ClickableComponent>
          <ClickableComponent
            href=""
            variants={['link']}
          >
            <User />
          </ClickableComponent>
        </div>
        <span className="hidden xl:block">
          <CurrencyDropdown />
        </span>
      </ul>
    </>
  );
};

export default NavbarLinks;
