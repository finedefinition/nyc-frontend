'use client';
import { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import Fullscreen from 'react-fullscreen-crossbrowser';

import { YachtDetail } from '@/interfaces/yacht.interface';
import fullScreen from '@/public/icons/fullScreen.svg';
import { ContactForm } from '../MainPageContent/ContactSection/ContactForm';
import { ProductPageSlider } from './ProductPageSlider';
import { YachtDetails } from './YachtDetails';
import { FullScreenGallery } from './FullScreenGallery';

const DynamicYachtPrice = dynamic(
  () => import('../Catalogue/Card/YachtPrice').then((mod) => mod.YachtPrice),
  {
    ssr: false,
  }
);

type ProductPageProps = {
  yacht: YachtDetail;
  images: (string | null)[];
};

export const ProductPage = ({ yacht, images }: ProductPageProps) => {
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(false);
  const {
    yacht_make,
    yacht_model,
    yacht_year,
    yacht_country,
    yacht_town,
    yacht_price,
    yacht_vat,
    yacht_description,
    yacht_loa,
    yacht_beam,
    yacht_draft,
    yacht_cabin,
    yacht_berth,
    yacht_shower,
    yacht_heads,
    yacht_keel_type,
    yacht_fuel_type,
  } = yacht;

  const yachtSpecifications = {
    yacht_loa,
    yacht_beam,
    yacht_draft,
    yacht_cabin,
    yacht_berth,
    yacht_shower,
    yacht_heads,
    yacht_keel_type,
    yacht_fuel_type,
  };

  return (
    <>
      <Fullscreen
        enabled={isFullscreenEnabled}
        onChange={(isFullscreenEnabled) =>
          setIsFullscreenEnabled(isFullscreenEnabled)
        }
      >
        {isFullscreenEnabled && (
          <FullScreenGallery
            yacht_make={yacht_make}
            yacht_model={yacht_model}
            yacht_price={yacht_price}
            images={images}
            setIsFullscreenEnabled={setIsFullscreenEnabled}
          />
        )}
      </Fullscreen>
      <div className="w-full px-5 md:px-16 pb-4 md:pb-6 xl:pb-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-4 xl:grid-cols-12">
          <div className="xl:col-span-8 flex flex-col items-center lg:flex-row lg:justify-between">
            <span className="text-center text-xl font-medium md:text-2xl font-baiJ">
              {`${yacht_make} ${yacht_model}, ${yacht_year}, ${yacht_country}, ${yacht_town}`}
            </span>
            <span>
              <DynamicYachtPrice price={yacht_price} />
            </span>
          </div>
          <div className="grid justify-center items-center lg:justify-end xl:col-span-4">
            <p className="text-base">
              Tax / VAT status{' '}
              <span className="text-secondary-100">
                {yacht_vat ? 'Paid / Included' : 'Unpaid / Excluded'}
              </span>
            </p>
          </div>
          <div className="xl:col-span-8">
            <div className="h-[300px] md:h-[400px] lg:h-[700px] relative block w-full">
              <span
                className="absolute top-7 right-7 z-20 bg-grey-20 rounded-lg cursor-pointer p-1"
                onClick={() => setIsFullscreenEnabled(true)}
              >
                <Image
                  src={fullScreen}
                  width={24}
                  height={24}
                  alt="full screen button"
                />
              </span>
              <ProductPageSlider images={images} />
            </div>
            <h4 className="text-center xl:text-left pt-10 mb-4">About</h4>
            <div className="grid gap-4 2xl:grid-cols-[5fr_3fr]">
              <p className="text-base text-justify">{yacht_description}</p>
              <div>
                <ul className="grid md:grid-cols-2 2xl:grid-cols-1">
                  <YachtDetails yachtSpecifications={yachtSpecifications} />
                </ul>
              </div>
            </div>
          </div>
          <div className="xl:col-span-4">
            <div className="md:border md:border-primary md:p-4 3xl:p-12 rounded-2xl max-w-[600px] mx-auto h-[560px]">
              <h4 className="text-center xl:text-left pt-10 mb-8">
                Contact Us
              </h4>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
