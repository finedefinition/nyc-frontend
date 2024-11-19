import { sortFields } from '@/data/catalogue/sortFields';
import ClickableComponent from '../ClickableComponent/ClickableComponent';
import ModalWrapper from './ModalWrapper';

type SortModalProps = {
  title?: string;
  onClose: () => void;
};

const SortModal = ({ title, onClose }: SortModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <div className="bg-white flex flex-col w-[216px] p-5 rounded-2xl space-y-8 border borber-grey-100 absolute top-60 right-5 md:right-16">
        {sortFields.map((sortField) => (
          <ClickableComponent
            key={sortField.name}
            href={sortField.href}
            className={`text-grey-100 text-center pb-2 border-b border-transparent hover:border-b-secondary-100 ${sortField.name === title ? 'border-b-grey-100' : ''} transform`}
          >
            {sortField.name}
          </ClickableComponent>
        ))}
      </div>
    </ModalWrapper>
  );
};

export default SortModal;
