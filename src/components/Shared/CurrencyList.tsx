import Image from 'next/image';

import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';
import { useCurrency } from '@/context/CurrencyContext';
import { currencyData } from '@/data/currencyData';

type CurrencyListProps = {
  desktopModal?: boolean;
  onClose: () => void;
};

const CurrencyList = ({ desktopModal, onClose }: CurrencyListProps) => {
  const { selectedCurrency, setCurrency } = useCurrency();

  const currencyModalHandler = (currency: string) => {
    setCurrency(currency);
    onClose();
  };
  return (
    <ul
      onClick={(e) => e.stopPropagation()}
      className={
        desktopModal
          ? 'absolute top-20 right-44 bg-white px-4 py-4 rounded-2xl animate-scale-up'
          : 'flex justify-center'
      }
    >
      {currencyData.map((currency) => (
        <li
          key={currency.currencyName}
          className={`mb-4 last:mb-0 border border-transparent hover:border-b-primary ${selectedCurrency.name === currency.currencyName && 'border-b-secondary-100 rounded-none'}`}
        >
          <ClickableComponent
            type="button"
            className="flex items-center gap-2 px-4 py-2"
            onClick={() => currencyModalHandler(currency.currencyName)}
          >
            {desktopModal && currency.currencyName}
            <Image
              src={currency.flag}
              alt={currency.currencyName}
            />
          </ClickableComponent>
        </li>
      ))}
    </ul>
  );
};

export default CurrencyList;
