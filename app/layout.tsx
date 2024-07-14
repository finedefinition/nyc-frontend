import '../styles/globals.scss';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const NoSSRNavBar = dynamic(() => import('@/components/Navbar/Navbar'), {
  ssr: false,
});

import Footer from '@/components/Footer/Footer';

import { roboto, baiJamjuree, beautifulEs } from '@/utils/fonts/fonts';
import AllContextProviders from '@/context/AllContextProviders';

export const metadata: Metadata = {
  title: 'Norse Yacht Co | Selling yachts from Norway',
  description: 'Business Consulting and Services',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${baiJamjuree.variable} ${beautifulEs.variable} ${roboto.variable} page`}
    >
      <head>
        <link
          rel="icon"
          type="image/x-icon"
          href="/favicon.ico"
          sizes="any"
        />
      </head>
      <body
        className={`page__body ${baiJamjuree.variable} ${beautifulEs.variable} ${roboto.variable} page`}
        suppressHydrationWarning={true}
      >
        <AllContextProviders>
          <NoSSRNavBar />
          {children}
          <Footer />
        </AllContextProviders>
      </body>
    </html>
  );
}
