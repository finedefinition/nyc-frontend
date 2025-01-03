import type { Metadata } from 'next';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { roboto, baiJ, bEs } from '@/utils/fonts/pageFonts';

import { CurrencyProvider } from '@/context/CurrencyContext';

import { themeConfig } from '@/lib/antd/themeConfig';

import './globals.css';

export const metadata: Metadata = {
  title: 'Norse Yacht Co | Selling yachts from Norway',
  description: 'Business Consulting and Services',
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${baiJ.variable} ${bEs.variable}`}
    >
      <body className="bg-white font-roboto text-black font-normal h-screen flex flex-col justify-between max-w-screen-3xl mx-auto">
        <AntdRegistry>
          <ConfigProvider theme={themeConfig}>
            <CurrencyProvider>
              {children}
              {modal}
            </CurrencyProvider>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
