'use client';

import Image from 'next/image';
import { useState } from 'react';
import Fullscreen from 'react-fullscreen-crossbrowser';
import QuestionMarkSvg from '@/components/SvgIconsComponents/QuestionMarkSvg';
import { Vessel } from '@/interfaces/vessel.interface';
import FullScreen from '@/public/icons/full_screen.svg';
import Slider from '@/components/ProductCard/Slider/Slider';
import ContactForm from '@/components/ContactForm/ContactForm';
import YachtPrice from '@/components/YachtPrice/YachtPrice';
import typo from '../../../styles/typography.module.scss';
import ProductCardGallery from '../ProductCardGallery/ProductCardGallery';
import styles from './VesselView.module.scss';

type Props = {
  ves: Vessel;
  images: string[];
};

export const VesselView: React.FC<Props> = ({ ves, images }) => {
  const [isFullscreenEnabled, setIsFullscreenEnabled] = useState(false);

  return (
    <>
      <Fullscreen
        enabled={isFullscreenEnabled}
        onChange={(isFullscreenEnabled) =>
          setIsFullscreenEnabled(isFullscreenEnabled)
        }
      >
        {isFullscreenEnabled && (
          <ProductCardGallery
            yacht={ves}
            images={images}
            setIsFullscreenEnabled={setIsFullscreenEnabled}
          />
        )}
      </Fullscreen>
      <div className={styles.page}>
        <div className={styles.body}>
          <div className={styles.body__top}>
            <span className={typo.typo_h4}>
              {ves.yacht_make} {ves.yacht_model}, {ves.yacht_year},{' '}
              {ves.yacht_country}, {ves.yacht_town}
            </span>
            <YachtPrice
              price={ves.yacht_price}
              old_price={ves.yacht_price_old}
            />
          </div>
          <div className={styles.body__gallery}>
            <span
              className={styles.full_screen}
              onClick={() => setIsFullscreenEnabled(true)}
            >
              <Image
                src={FullScreen}
                width={24}
                height={24}
                alt="full screen button"
              />
            </span>
            <Slider images={images} />
          </div>
          <div className={styles.body__bottom}>
            <h1 className={typo.typo_h4}>About</h1>
            <div className={styles.body__about}>
              <div className={styles.body__about_text}>
                <p>
                  Discover the epitome of maritime luxury with our stunning
                  yacht, &quot;Ocean Serenity.&quot; This sleek and elegant
                  vessel combines cutting-edge design with unparalleled comfort,
                  offering a truly indulgent experience on the open seas. With a
                  length of 120 feet and a beam of 28 feet, Ocean Serenity
                  provides ample space for relaxation, entertainment, and
                  exploration.
                  <br />
                  Ocean Serenity boasts a modern, sophisticated design with a
                  stylish exterior and luxurious interior finishes. From the
                  moment you step on board, you are enveloped in an atmosphere
                  of opulence and refinement.
                  <br />
                  The interior spaces are meticulously designed, featuring
                  high-quality materials and exquisite craftsmanship. The yacht
                  accommodates up to 12 guests in 6 beautifully appointed
                  cabins, each with ensuite bathrooms. The master suite is a
                  sanctuary of comfort, offering panoramic views of the ocean
                  and a private lounge area.
                  <br />
                  Ocean Serenity offers a wide range of entertainment options,
                  including a state-of-the-art home theater system, a
                  well-stocked library, and a spacious lounge area. The outdoor
                  deck features a Jacuzzi, perfect for unwinding under the sun
                  or stars. Additionally, there is a fully equipped bar and
                  grill for delightful al fresco dining experiences.
                </p>
              </div>
              <div className={styles.body__about_featchures}>
                <p className={styles.body__about_featch}>
                  <span>Lengh Overall:</span>
                  <span>{ves.yacht_loa}</span>
                </p>
                <p className={styles.body__about_featch}>
                  <span>Beam:</span>
                  <span>{ves.yacht_beam}</span>
                </p>
                <p className={styles.body__about_featch}>
                  <span>Draft:</span>
                  <span>{ves.yacht_draft}</span>
                </p>
                <p className={styles.body__about_featch}>
                  <span>Cabin:</span>
                  <span>{ves.yacht_cabin}</span>
                </p>
                <p className={styles.body__about_featch}>
                  <span>Berth:</span>
                  <span>{ves.yacht_berth}</span>
                </p>
                <p className={styles.body__about_featch}>
                  <span>Kell Type:</span>
                  <span>{ves.yacht_keel_type}</span>
                </p>
                <p className={styles.body__about_featch}>
                  <span>Fuel Type:</span>
                  <span>{ves.yacht_fuel_type}</span>
                </p>
                <p className={styles.body__about_featch}>
                  <span>Engine Quantity:</span>
                  <span>{ves.yacht_engine}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.form_container}>
          <div className={styles.form_top}>
            <span>VAT Included</span>{' '}
            <span className={styles.form_modal}>
              <QuestionMarkSvg />
            </span>
          </div>
          <div className={styles.form}>
            <h3 className={`${typo.typo_h4} ${styles.form_header}`}>
              Contact us
            </h3>
            <ContactForm productCard={true} />
          </div>
        </div>
      </div>
    </>
  );
};

export default VesselView;
