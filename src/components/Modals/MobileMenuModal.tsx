import ClickableComponent from '@/components/ClickableComponent/ClickableComponent';

import { mobileMenuLinks } from '@/data/links/mobileMenuLinks';
import CurrencyList from '../Shared/CurrencyList';
import SocialMedia from '../Shared/SocialMedia';
import ModalWrapper from './ModalWrapper';

type MobileMenuModalProps = {
  onClose: () => void;
};

const MobileMenuModal = ({ onClose }: MobileMenuModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <ul
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative w-full h-full pt-16 xs:pt-28 animate-slide-in-left"
      >
        {mobileMenuLinks.map((link, i) => (
          <li
            key={i}
            className="text-center pb-8"
          >
            <ClickableComponent
              href={link.href}
              className="font-baiJ text-2xl"
            >
              {link.text}
            </ClickableComponent>
          </li>
        ))}
        <li>
          <CurrencyList onClose={onClose} />
        </li>
        <li>
          <SocialMedia color="#4d6575" />
        </li>
      </ul>
    </ModalWrapper>
  );
};

export default MobileMenuModal;
