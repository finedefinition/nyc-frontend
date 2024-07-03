import React from 'react';
import { CurrencyProvider } from './CurrencyContext';
import { AuthProvider } from './AuthContext';
import { ModalsProvider } from './ModalsContext';
import { FavouriteYachtsProvider } from './FavouriteYachtsContext';

const AllContextProviders = (props: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>
        <FavouriteYachtsProvider>
          <CurrencyProvider>
            <ModalsProvider>{props.children}</ModalsProvider>
          </CurrencyProvider>
        </FavouriteYachtsProvider>
      </AuthProvider>
    </>
  );
};

export default AllContextProviders;
