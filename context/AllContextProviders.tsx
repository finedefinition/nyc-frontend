import React from 'react';
import { CurrencyProvider } from './CurrencyContext';
import { AuthProvider } from './AuthContext';
import { ModalsProvider } from './ModalsContext';

const AllContextProviders = (props: { children: React.ReactNode }) => {
  return (
    <>
      <CurrencyProvider>
        <AuthProvider>
          <ModalsProvider>{props.children}</ModalsProvider>
        </AuthProvider>
      </CurrencyProvider>
    </>
  );
};

export default AllContextProviders;
