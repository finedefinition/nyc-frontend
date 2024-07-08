'use client';

// import { useEffect, useState } from 'react';
import Image from 'next/image';
// import { usePathname } from 'next/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  FreeMode,
  Scrollbar,
  Mousewheel,
  Navigation,
  Thumbs,
} from 'swiper/modules';
import Close from '@/public/icons/close.svg';
import Button from '@/components/Button/Button';
// import { Images, Vessel } from '@/interfaces/vessel.interface';
import { Vessel } from '@/interfaces/vessel.interface';
import { useCurrency } from '@/context/CurrencyContext';
// import { getVesselById } from '@/utils/api/getAllVessels';
// import { fetchImgUrl } from '@/utils/api/getImageFromAWS';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import LeftArrowSvg from '@/components/SvgIconsComponents/LeftArrowSvg';
import RightArrowSvg from '@/components/SvgIconsComponents/RightArrowSvg';
import styles from './gallery.module.scss';

type Props = {
  vessel: Vessel;
  images: string[];
};

const Gallery = ({ vessel, images }: Props) => {
  const { selectedCurrency, selectedCurrencySymbol } = useCurrency();
  // const [vessel, setVessel] = useState<Vessel>()
  // const [images, setImages] = useState<string[]>([])
  // const paths = usePathname();
  // const id = paths.split('/')[2]

  // async function fetchYacht() {
  //   const ves = await getVesselById(`/${id}`)
  //   const imgs = await loadAllPhotosFromAWS(ves.yacht_images);
  //   setVessel(ves)
  //   setImages(imgs)

  //   async function loadAllPhotosFromAWS(images: Images[]) {
  //     const arrayOfFetchImages = [];

  //     for (let i = 0; i < images.length; i++) {
  //       const img = await fetchImgUrl(images[i].yacht_image_key);
  //       arrayOfFetchImages.push(img);
  //     }

  //     return arrayOfFetchImages;
  //   }
  // }

  // useEffect(() => {
  //   fetchYacht()
  // })

  const key = `yacht_price_${selectedCurrency}`;
  const currPrice = vessel && (+vessel[key]).toLocaleString('en-US');

  return (
    vessel && (
      <div className={styles.container}>
        <div className={styles.gallery__container}>
          <div className={styles.gallery_small}>
            <button
              type="button"
              className={styles.swiper_prev}
            >
              <LeftArrowSvg color={false} />
            </button>

            <Swiper
              modules={[Navigation, Thumbs]}
              navigation={{
                nextEl: `.${styles.swiper_next}`,
                prevEl: `.${styles.swiper_prev}`,
              }}
              direction={'vertical'}
              slidesPerView={'auto'}
              loop={true}
              freeMode={true}
              watchSlidesProgress={true}
              className={styles.swiper_small}
            >
              <SwiperSlide>
                {[...images, ...images].map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="yacht"
                    className={styles.swiper_small__image}
                  />
                ))}
              </SwiperSlide>
            </Swiper>

            <button
              type="button"
              className={styles.swiper_next}
            >
              <RightArrowSvg color={false} />
            </button>
          </div>

          <div className={styles.gallery_big}>
            <p className={styles.gallery_big__info}>
              {vessel.yacht_model}{' '}
              <Button
                text="Buy now"
                linkTo="/"
                primary
              />
            </p>
            <Swiper
              direction={'vertical'}
              slidesPerView={'auto'}
              mousewheel={true}
              modules={[FreeMode, Scrollbar, Mousewheel, Thumbs]}
              grabCursor={true}
              className={styles.swiper_big}
            >
              <SwiperSlide className={styles.slider__image__container}>
                {images.map((img, index) => (
                  <img
                    key={index}
                    id={String(index)}
                    src={img}
                    alt="yacht"
                    className={styles.swiper_big__image}
                  />
                ))}
              </SwiperSlide>
            </Swiper>
          </div>

          <div className={styles.info}>
            <div className={styles.info__top}>
              <span className={styles.info__top__title}>
                {vessel.yacht_model}, {vessel.yacht_year},{vessel.yacht_country}
                , {vessel.yacht_town}
              </span>
              <Image
                width={24}
                height={24}
                src={Close}
                alt="Close"
                className={styles.social__button}
              />
            </div>
            <div className={styles.info__body_featchures}>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Price:</p>
                <p
                  className={`${styles.info__body_item} ${styles.orange}`}
                >{`${selectedCurrencySymbol} ${currPrice}`}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Year:</p>
                <p className={styles.info__body_item}>{vessel.yacht_year}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Country:</p>
                <p className={styles.info__body_item}>{vessel.yacht_country}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>State:</p>
                <p className={styles.info__body_item}>{vessel.yacht_town}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Lengh Overall:</p>
                <p className={styles.info__body_item}>{vessel.yacht_loa}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Beam:</p>
                <p className={styles.info__body_item}>{vessel.yacht_beam}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Draft:</p>
                <p className={styles.info__body_item}>{vessel.yacht_draft}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Cabin:</p>
                <p className={styles.info__body_item}>{vessel.yacht_cabin}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Berth:</p>
                <p className={styles.info__body_item}>{vessel.yacht_berth}</p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Kell Type:</p>
                <p className={styles.info__body_item}>
                  {vessel.yacht_keel_type}
                </p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Fuel Type:</p>
                <p className={styles.info__body_item}>
                  {vessel.yacht_fuel_type}
                </p>
              </section>
              <section className={styles.info__body_item__container}>
                <p className={styles.info__body_title}>Engine Quantity:</p>
                <p className={styles.info__body_item}>{vessel.yacht_engine}</p>
              </section>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Gallery;
