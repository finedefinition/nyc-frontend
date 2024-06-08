import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { currencyArray } from '@/utils/currency/currencyArray';
import { useCurrency } from '@/context/CurrencyContext';
import styles from '@/components/Navbar/CurrencyModal/currencyModal.module.scss';

type Props = {
  isCurrencyModalOpen: boolean;
  currencyModalHandler: () => void;
};

const CurrencyModal = ({
  isCurrencyModalOpen,
  currencyModalHandler,
}: Props) => {
  const pathname = usePathname();
  const { selectedCurrency, setCurrency } = useCurrency();

  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };

  const wrapperFunction = (currency: string) => {
    currencyModalHandler();
    handleCurrencyChange(currency);
  };

  return (
    <div
      className={`${styles.modal} ${isCurrencyModalOpen ? styles.open : ''}`}
      onClick={currencyModalHandler}
    >
      <div className={styles.modal__content}>
        {currencyArray.map((curr) => (
          <Link
            key={curr.currencyName}
            href={pathname}
            onClick={() => wrapperFunction(curr.currencyName)}
            className={`${styles.modal__link} ${
              selectedCurrency === curr.currencyName
                ? styles.modal__link__active
                : ''
            }`}
          >
            {curr.currencyName}
            <Image
              src={curr.flag}
              alt={curr.currencyName}
              className={`${styles.modal__img}`}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CurrencyModal;
