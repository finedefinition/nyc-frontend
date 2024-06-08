'use client';

import { Dispatch, SetStateAction } from 'react';
import { Vessel } from '@/interfaces/vessel.interface';
import CloseSvg from '@/components/SvgIconsComponents/CloseSvg';
import ProductCardGallerySlider from '@/components/ProductCard/ProductCardGallerySlider/ProductCardGallerySlider';
import YachtPrice from '@/components/YachtPrice/YachtPrice';
import styles from './ProductCardGallery.module.scss';

type Props = {
  yacht: Vessel;
  images: string[];
  setIsFullscreenEnabled: Dispatch<SetStateAction<boolean>>;
};

const ProductCardGallery = ({
  yacht,
  images,
  setIsFullscreenEnabled,
}: Props) => {
  const { yacht_price, yacht_make, yacht_model } = yacht;

  return (
    <div
      className={styles.gallery}
    >
      <button
        className={styles.gallery__closeButton}
        type="button"
        onClick={() => setIsFullscreenEnabled(false)}
      >
        <CloseSvg color={'#fff'} />
      </button>
      <div className={styles.gallery__container}>
        <div className={styles.gallery__slider}>
          <h4 className={styles.gallery__title}>
            {yacht_make} {yacht_model}
            <YachtPrice price={yacht_price} />
          </h4>
          <ProductCardGallerySlider images={images} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardGallery;
