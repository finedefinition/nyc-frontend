import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { roboto, baiJ, bEs } from '@/utils/fonts/pageFonts';

import Navbar from '@/components/MainLayout/Navbar/Navbar';
import Footer from '@/components/MainLayout/Footer';

import { CurrencyProvider } from '@/context/CurrencyContext';

import { themeConfig } from '@/lib/antd/themeConfig';

// import 'antd/dist/reset.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Norse Yacht Co | Selling yachts from Norway',
  description: 'Business Consulting and Services',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${baiJ.variable} ${bEs.variable}`}
    >
      <body className="bg-white font-roboto text-black font-medium h-screen flex flex-col justify-between max-w-screen-3xl mx-auto">
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>
            <CurrencyProvider>
              <Navbar />
              {children}
              <Footer />
            </CurrencyProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
