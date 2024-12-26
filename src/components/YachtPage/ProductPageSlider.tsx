'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';

type ProductCardSliderProps = {
  images: (string | null)[];
};

const ProductPageSlider = ({ images }: ProductCardSliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation, Thumbs]}
        spaceBetween={10}
        loop={true}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        className="relative block h-4/5 w-full mb-4"
        grabCursor={true}
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              fill
              sizes="100vw"
              className="block h-full w-full object-cover rounded-2xl"
              src={img as string}
              alt="vessel"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        loop={images.length > 5}
        spaceBetween={12}
        slidesPerView={5}
        freeMode={true}
        watchSlidesProgress={true}
        grabCursor={true}
        modules={[Thumbs, FreeMode]}
        className="relative block h-1/5 w-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <Image
              fill
              sizes="25vw"
              src={img as string}
              alt="vessel"
              className="w-full h-full object-cover rounded-lg"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default ProductPageSlider;
