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
