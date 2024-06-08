'use client';
import { useCurrency } from '@/context/CurrencyContext';
import typo from '@/styles/typography.module.scss';

type YachtPriceProps = {
  price: number;
  old_price?: number;
};

const priceToRender = (price: number, curr: number): string => {
  return Math.round(price * (curr || 1)).toLocaleString('en-US');
};

const YachtPrice = ({ price, old_price = 0 }: YachtPriceProps) => {
  const { selectedCurrency, selectedCurrencySymbol, currencyRates } =
    useCurrency();
  const showOldPrice = +old_price > +price;
  const updatePrice = priceToRender(price, currencyRates[selectedCurrency]);
  const updatePriceOld = priceToRender(
    old_price,
    currencyRates[selectedCurrency]
  );
  return (
    <span className={typo.typo_price}>
      {`${selectedCurrencySymbol} ${updatePrice}`}
      {showOldPrice && (
        <span className={typo.typo_old_price}>
          {`${selectedCurrencySymbol} ${updatePriceOld}`}
        </span>
      )}
    </span>
  );
};

export default YachtPrice;
