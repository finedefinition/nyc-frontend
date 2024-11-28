'use client';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

const DynamicNavbarLinks = dynamic(() => import('./NavbarLinks'), {
  ssr: false,
});

const Navbar = () => (
  <nav className="relative z-20 grid grid-cols-[1fr_auto_1fr] gap-1 items-center pt-4 md:pt-6 xl:pt-8 px-5 md:px-16">
    <Suspense fallback={null}>
      <DynamicNavbarLinks />
    </Suspense>
  </nav>
);

export default Navbar;
