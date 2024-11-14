'use client';
import { Suspense } from 'react';
import { useCurrency } from '@/context/CurrencyContext';

const SplitCurrencyLink = () => {
  const { selectedCurrency } = useCurrency();
  return (
    <Suspense
      fallback={null}
    >{`Split currency / ${selectedCurrency.name}`}</Suspense>
  );
};

export default SplitCurrencyLink;
