import Image from 'next/image';
import { useCurrency } from '@/context/currency/CurrencyContext';
import { currencyData } from '@/data/currencyData';

type CurrencyListProps = {
  desktop?: boolean;
  onClose: () => void;
};

const CurrencyList = ({ desktop, onClose }: CurrencyListProps) => {
  const { selectedCurrency, setCurrency } = useCurrency();

  const currencyModalHandler = (currency: string) => {
    setCurrency(currency);
    onClose();
  };
  return (
    <ul
      onClick={(e) => e.stopPropagation()}
      className={
        desktop
          ? 'absolute right-0 bg-white border borber-grey-100 mt-1 px-4 py-4 rounded-2xl animate-scale-up'
          : 'flex justify-center'
      }
    >
      {currencyData.map((currency) => (
        <li
          key={currency.currencyName}
          className={`mb-4 last:mb-0 border border-transparent hover:border-b-primary ${selectedCurrency.name === currency.currencyName && 'border-b-secondary-100 rounded-none'}`}
        >
          <span
            className="flex items-center gap-2 px-4 py-2"
            onClick={(e) => {
              e.preventDefault();
              currencyModalHandler(currency.currencyName);
            }}
          >
            {desktop && currency.currencyName}
            <Image
              src={currency.flag}
              alt={currency.currencyName}
            />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default CurrencyList;
