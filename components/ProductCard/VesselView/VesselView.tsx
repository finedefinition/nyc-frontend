'use client';

import Image from 'next/image';
import {useState} from 'react';
import Fullscreen from 'react-fullscreen-crossbrowser';
import QuestionMarkSvg from '@/components/SvgIconsComponents/QuestionMarkSvg';
import {Vessel} from '@/interfaces/vessel.interface';
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

export const VesselView: React.FC<Props> = ({ves, images}) => {
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
                        <Slider images={images}/>
                    </div>
                    <div className={styles.body__bottom}>
                        <h1 className={typo.typo_h4}>About</h1>
                        <div className={styles.body__about}>
                            <div className={styles.body__about_text}>
                                <p className={styles.body__about_featch}>
                                    <span>{ves.yacht_description}</span>
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
                                    <span>Shower:</span>
                                    <span>{ves.yacht_shower}</span>
                                </p>
                                <p className={styles.body__about_featch}>
                                    <span>Heads:</span>
                                    <span>{ves.yacht_heads}</span>
                                </p>
                                <p className={styles.body__about_featch}>
                                    <span>Kell Type:</span>
                                    <span>{ves.yacht_keel_type}</span>
                                </p>
                                <p className={styles.body__about_featch}>
                                    <span>Fuel Type:</span>
                                    <span>{ves.yacht_fuel_type}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.form_container}>
                    <div className={styles.form_top}>
                        <span>VAT Included</span>{' '}
                        <span className={styles.form_modal}>
              <QuestionMarkSvg/>
            </span>
                    </div>
                    <div className={styles.form}>
                        <h3 className={`${typo.typo_h4} ${styles.form_header}`}>
                            Contact us
                        </h3>
                        <ContactForm productCard={true}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VesselView;
