'use client';

import { useRouter } from 'next/navigation';

import { ClickableComponent } from '../ClickableComponent/ClickableComponent';
import { SocialMedia } from '../Shared/SocialMedia';
import { Close } from '../SvgIcons/Close';
import { ModalWrapper } from './ModalWrapper';

export const ContactFormModal = () => {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };
  return (
    <ModalWrapper onClose={onClose}>
      <div className="relative bg-white p-9 text-center rounded-3xl shadow-custom">
        <span className="absolute top-4 right-4">
          <ClickableComponent
            type="button"
            onClick={onClose}
            variants={[]}
          >
            <Close />
          </ClickableComponent>
        </span>
        <h4 className="mb-6">Thank you for getting in touch</h4>
        <p className="mb-6">You will be contacted shortly</p>
        <span className="block mb-6">
          <ClickableComponent
            href="/"
            variants={['button', 'secondary']}
          >
            Return to the main page
          </ClickableComponent>
        </span>
        <SocialMedia color="#4d6575" />
      </div>
    </ModalWrapper>
  );
};
