// import Image from 'next/image';

// import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';

// import { useCurrency } from '@/context/CurrencyContext';

// import { currencyData } from '@/data/currencyData';

import CurrencyList from '../Shared/CurrencyList';
import ModalWrapper from './ModalWrapper';

type CurrencyModalProps = {
  onClose: () => void;
};

const CurrencyModal = ({ onClose }: CurrencyModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <CurrencyList
        desktopModal
        onClose={onClose}
      />
    </ModalWrapper>
  );
};

export default CurrencyModal;
