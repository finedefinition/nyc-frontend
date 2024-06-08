'use client';

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
// import { getCurrencyRates } from '@/utils/api/getCurrencyExange';

type CurrencyContextType = {
  selectedCurrency: string;
  selectedCurrencySymbol: string;
  currencyRates: { [key: string]: number };
  setCurrency: (currency: string) => void;
  updateCurrencyRates: () => Promise<void>;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined
);

type CurrencyProviderProps = {
  children: ReactNode;
};

const currencySymbols: { [key: string]: string } = {
  EUR: '€',
  GBP: '£',
  USD: '$',
  NOK: 'kr',
};

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({
  children,
}) => {
  const LOCAL_STORAGE_CURRENCY_KEY = 'selectedCurrency';
  const LOCAL_STORAGE_CURRENCY_TIME_UPDATE = 'lastUpdate';
  const LOCAL_STORAGE_RATES_KEY = 'currencyRates';
  const storedCurrency =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_CURRENCY_KEY)
      : null;

  const initialCurrency = storedCurrency ? storedCurrency : 'EUR';
  const [selectedCurrency, setSelectedCurrency] =
    useState<string>(initialCurrency);
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] =
    useState<string>('€');
  const [currencyRates, setCurrencyRates] = useState<{ [key: string]: number }>(
    {}
  );
  const setCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    setSelectedCurrencySymbol(currencySymbols[currency]);
  };

  const updateCurrencyRates = async () => {
    try {
      const lastUpdate = localStorage.getItem(
        LOCAL_STORAGE_CURRENCY_TIME_UPDATE
      );

      const storedLastUpdateDate = lastUpdate && new Date(lastUpdate);
      const today = new Date().setHours(17, 0, 0, 0);

      const storedRates = localStorage.getItem(LOCAL_STORAGE_RATES_KEY);

      if (
        !storedLastUpdateDate ||
        today - storedLastUpdateDate.getTime() >= 86400000
      ) {
        const response = await fetch(
          'https://api.frankfurter.app/latest?to=USD,GBP,NOK'
        );

        if (!response.ok) {
          throw new Error('Failed to fetch currency rates');
        }

        const data = await response.json();

        setCurrencyRates(data.rates);

        const lastCurrencyUptades = new Date(data.date).setHours(17, 0, 0, 0);
        localStorage.setItem(
          LOCAL_STORAGE_CURRENCY_TIME_UPDATE,
          new Date(lastCurrencyUptades).toUTCString()
        );

        localStorage.setItem(
          LOCAL_STORAGE_RATES_KEY,
          JSON.stringify(data.rates)
        );
      } else if (storedRates) {
        const currencyRates = JSON.parse(storedRates);
        setCurrencyRates(currencyRates);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error('Error updating currency rates:', error);
    }
  };

  useEffect(() => {
    const storedCurrency = localStorage.getItem(LOCAL_STORAGE_CURRENCY_KEY);
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
      setSelectedCurrencySymbol(currencySymbols[storedCurrency]);
    }
    updateCurrencyRates();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CURRENCY_KEY, selectedCurrency);
  }, [selectedCurrency]);

  return (
    <CurrencyContext.Provider
      value={{
        selectedCurrency,
        selectedCurrencySymbol,
        currencyRates,
        setCurrency,
        updateCurrencyRates,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
