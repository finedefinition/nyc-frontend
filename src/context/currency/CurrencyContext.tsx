'use client';
import { createContext, useContext } from 'react';

type CurrencyContextType = {
  selectedCurrency: { [key: string]: string };
  currencyRates: { [key: string]: number };
  setCurrency: (currency: string) => void;
  updateCurrencyRates: () => Promise<void>;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

export default CurrencyContext;
