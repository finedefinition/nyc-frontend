'use client';
import { useRouter } from 'next/navigation';
import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';

import { mobileMenuLinks } from '@/data/links/mobileMenuLinks';
import CurrencyList from '@/components/Shared/CurrencyList';
import SocialMedia from '@/components/Shared/SocialMedia';

const MobileMenu = () => {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };
  return (
    <div className="fixed z-10 inset-0 bg-transparent flex items-center justify-center">
      <ul
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative w-full h-full pt-16 xs:pt-28 animate-slide-in-left"
      >
        {mobileMenuLinks.map((link, i) => (
          <li
            key={i}
            className="text-center pb-8"
          >
            <ClickableComponent
              href={link.href}
              className="font-baiJ text-2xl"
            >
              {link.text}
            </ClickableComponent>
          </li>
        ))}
        <li>
          <CurrencyList onClose={onClose} />
        </li>
        <li>
          <SocialMedia color="#4d6575" />
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
