'use client';
import { ReactNode, useEffect } from 'react';
import { ClickableComponent } from '../ClickableComponent/ClickableComponent';
import { Close } from '../SvgIcons/Close';

type ModalWrapperProps = {
  onClose: () => void;
  children: ReactNode;
};

export const ModalWrapper = ({ onClose, children }: ModalWrapperProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed z-10 inset-0 bg-transparent flex items-center justify-center">
      <div className="relative bg-white p-9 text-center rounded-3xl">
        <span className="absolute top-4 right-4">
          <ClickableComponent
            type="button"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onClose();
            }}
            variants={[]}
          >
            <Close />
          </ClickableComponent>
        </span>
        {children}
      </div>
    </div>
  );
};
