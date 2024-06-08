'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import styles from './Slider.module.scss';

type SliderProps = {
  images: string[];
};

const Slider = ({ images }: SliderProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();

  return (
    <div>
      <div className={styles.container}>
        <Swiper
          navigation={true}
          modules={[Navigation, Thumbs]}
          spaceBetween={10}
          loop={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          className={styles.slide__container}
          grabCursor={true}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                height={650}
                width={1036}
                src={img}
                alt="vessel"
                className={styles.slide}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={12}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          grabCursor={true}
          modules={[Thumbs, FreeMode]}
          className={styles.slide__thumb__container}
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                width={127}
                height={95}
                src={img}
                alt="vessel"
                className={styles.slide__thumb}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Slider;
