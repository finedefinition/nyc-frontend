import React, { ReactNode } from 'react';
import { CurrencyProvider } from './currency/CurrencyProvider';
import AntdProvider from './antd/AntdProvider';

type RootProviderProps = {
  children: ReactNode;
};

const RootProvider: React.FC<RootProviderProps> = ({ children }) => {
  return (
    <AntdProvider>
      <CurrencyProvider>{children}</CurrencyProvider>
    </AntdProvider>
  );
};

export default RootProvider;
