'use client';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction } from 'react';
import { ClickableComponent } from '../ClickableComponent/ClickableComponent';
import { Close } from '../SvgIcons/Close';
import { FullScreenGallerySlider } from './FullScreenGallerySlider';

const DynamicYachtPrice = dynamic(
  () => import('../Catalogue/Card/YachtPrice').then((mod) => mod.YachtPrice),
  {
    ssr: false,
  }
);

type FullScreenGalleryProps = {
  yacht_make: string;
  yacht_model: string;
  yacht_price: string;
  images: (string | null)[];
  setIsFullscreenEnabled: Dispatch<SetStateAction<boolean>>;
};

export const FullScreenGallery = ({
  yacht_make,
  yacht_model,
  yacht_price,
  images,
  setIsFullscreenEnabled,
}: FullScreenGalleryProps) => {
  return (
    <div className="absolute inset-0 h-screen w-full bg-black p-4 md:p-8">
      <ClickableComponent
        type="button"
        className="w-full flex justify-end"
        onClick={() => setIsFullscreenEnabled(false)}
      >
        <Close />
      </ClickableComponent>
      <div className="h-full mx-auto">
        <div className="w-full h-full overflow-hidden">
          <div className="flex justify-between">
            <span className="text-white text-center text-xl font-medium md:text-2xl font-baiJ">
              {`${yacht_make} ${yacht_model}`}
            </span>
            <span>
              <DynamicYachtPrice price={yacht_price} />
            </span>
          </div>
          <FullScreenGallerySlider images={images} />
        </div>
      </div>
    </div>
  );
};
