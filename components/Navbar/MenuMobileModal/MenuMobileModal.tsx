'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useCurrency } from '@/context/CurrencyContext';

import { pageLinksArray } from '@/utils/links/pageLinks';

import { currencyArray } from '@/utils/currency/currencyArray';
import { useAuth } from '@/context/AuthContext';
import { useModals } from '@/context/ModalsContext';
import SocialMedia from '../../SocialMedia/SocialMedia';
import styles from './menuMobileModal.module.scss';

const variants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: '-100%' },
};

type Props = {
  isMobileMenuClose: boolean;
  mobileMenuHandler: () => void;
};

const MenuMobileModal = ({ isMobileMenuClose, mobileMenuHandler }: Props) => {
  const { setCurrency, selectedCurrency } = useCurrency();
  const { isAuthenticated, userLogout, userInfoToken } = useAuth();
  const { accountModalLoginHandler } = useModals();
  const contactPhome = '+353874375161';
  const contactEmail = 'info@norseyacht.com';
  const color = '#4D6575';
  const pathname = usePathname();
  const wrapperFunction = (currency: string) => {
    handleCurrencyChange(currency);
  };
  const handleCurrencyChange = (currency: string) => {
    setCurrency(currency);
  };
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'scroll';
    };
  }, []);
  return (
    <>
      <motion.div
        className={styles.modal}
        animate={isMobileMenuClose ? 'open' : 'closed'}
        variants={variants}
      >
        {pageLinksArray.slice(0, 2).map((link, i) => (
          <Link
            key={i}
            href={link.path}
            className={styles.modal__link}
            onClick={mobileMenuHandler}
          >
            {link.title}
          </Link>
        ))}
        {isAuthenticated ? (
          <>
            <Link
              href='/'
              className={`${styles.modal__link} ${styles.modal__user}`}
            >
              {userInfoToken &&
                `${userInfoToken.given_name} ${userInfoToken.family_name}`}
            </Link>
            <button
              onClick={userLogout}
              className={styles.modal__logOut}
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            type='button'
            onClick={accountModalLoginHandler}
            className={`${styles.modal__link} `}
          >
            My account
          </button>
        )}
        <button
          type='button'
          className={`${styles.modal__link} ${styles.modal__currency}`}
        >
          {`Split currency / ${selectedCurrency}`}
        </button>
        <div className={styles.modal__social}>
          {currencyArray.map((curr) => (
            <Link
              key={curr.currencyName}
              href={pathname}
              onClick={() => wrapperFunction(curr.currencyName)}
              className={`${styles.modal__flag}`}
            >
              <Image
                src={curr.flag}
                alt={curr.currencyName}
                className={`${styles.modal__img}`}
                width={40}
                height={40}
              />
            </Link>
          ))}
        </div>
        <div className={styles.contact}>
          <p className={styles.contact__title}>Contact</p>
          <Link
            href='tel:+380632345521'
            className={styles.contact__phone}
          >
            {contactPhome}
          </Link>
          <Link
            href='mailto:info@norseyacht.com'
            className={styles.contact__email}
          >
            {contactEmail}
          </Link>
        </div>
        <div className={styles.follow}>
          <p className={styles.follow__title}>Follow us</p>
          <div className={styles.follow__social}>
            <SocialMedia color={color} />
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default MenuMobileModal;
