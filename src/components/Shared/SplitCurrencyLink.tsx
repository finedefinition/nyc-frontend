'use client';
import { Suspense } from 'react';
import { useCurrency } from '@/context/currency/CurrencyContext';

export const SplitCurrencyLink = () => {
  const { selectedCurrency } = useCurrency();
  return (
    <Suspense fallback={null}>{`Currency / ${selectedCurrency.name}`}</Suspense>
  );
};
