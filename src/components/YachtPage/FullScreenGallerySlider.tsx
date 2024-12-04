'use client';
import Image from 'next/image';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs, Mousewheel } from 'swiper/modules';

type FullScreenGallerySliderProps = {
  images: (string | null)[];
};

const FullScreenGallerySlider = ({ images }: FullScreenGallerySliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  return (
    <div className="flex items-center justify-center h-full w-full relative xl:gap-4">
      <Swiper
        direction={'vertical'}
        slidesPerView={2.3}
        mousewheel={true}
        loop={true}
        spaceBetween={10}
        breakpoints={{
          576: {
            slidesPerView: 1.1,
            spaceBetween: 20,
          },
        }}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[Mousewheel, FreeMode, Navigation, Thumbs]}
        className="h-full w-full rounded-3xl relative block"
      >
        {images.map((img) => (
          <SwiperSlide
            key={img}
            className="h-5/6 w-full relative"
          >
            <Image
              src={img as string}
              fill
              sizes="100vw"
              className="block h-full w-full object-cover"
              alt="gallery_slider_img"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Swiper
        onSwiper={setThumbsSwiper}
        direction={'vertical'}
        loop={images.length > 4}
        spaceBetween={10}
        slidesPerView={4}
        mousewheel={true}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[Mousewheel, FreeMode, Navigation, Thumbs]}
        className="w-0 h-full xl:w-1/5 "
      >
        {images.map((img) => (
          <SwiperSlide key={img}>
            <Image
              src={img as string}
              className="rounded-lg"
              fill
              alt="gallery_slider_img"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default FullScreenGallerySlider;
