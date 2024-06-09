import React from 'react';
import BreadCrumbs from '@/components/BreadCrumbs/BreadCrumbs';

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>
        <BreadCrumbs />
      </header>
      <main>
        {children}
      </main>
    </div>
  );
}
