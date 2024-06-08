'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import LogoImg from '@/public/icons/logo.svg';
import { pageLinksArray } from '@/utils/links/pageLinks';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useCurrency } from '@/context/CurrencyContext';
import MenuMobileModal from '@/components/Navbar/MenuMobileModal/MenuMobileModal';
import MenuIcon from '@/components/Navbar/MenuIcon/MenuIcon';
import ContactsModal from '@/components/Navbar/ContactsModal/ContactsModal';
import CurrencyModal from '@/components/Navbar/CurrencyModal/CurrencyModal';
import styles from '@/components/Navbar/navbar.module.scss';

import { useAuth } from '@/context/AuthContext';
import { useModals } from '@/context/ModalsContext';
import AccountModal from './AccountModal/AccountModal';
import LoginModal from './LoginModal/LoginModal';
import RecoveryModal from './RecoveryModal/RecoveryModal';

const Navbar = () => {
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isMobileMenuClose, setIsMobileMenuClose] = useState(false);
  const [desktopScreen, setDesktopScreen] = useState(false);
  const { isAuthenticated, userLogout, userInfoToken } = useAuth();
  const {
    isAccountModalOpen,
    isAccountModalLoginOpen,
    isRecoveryModalOpen,
    accountModalHandler,
    accountModalLoginHandler,
    toggleBetweenModals,
  } = useModals();
  const { width } = useWindowDimensions();
  const { selectedCurrency } = useCurrency();

  useEffect(() => {
    const screen = (width as number) < 1200;
    setDesktopScreen(!screen);
  }, [width]);

  const currencyModalHandler = () => {
    setIsCurrencyModalOpen(!isCurrencyModalOpen);
  };

  const contactsModalHandler = () => {
    setIsContactsModalOpen(!isContactsModalOpen);
  };

  const mobileMenuHandler = () => {
    setIsMobileMenuClose(!isMobileMenuClose);
  };

  return (
    <>
      {isMobileMenuClose && (
        <MenuMobileModal
          isMobileMenuClose={isMobileMenuClose}
          mobileMenuHandler={mobileMenuHandler}
        />
      )}
      {isCurrencyModalOpen && (
        <CurrencyModal
          isCurrencyModalOpen={isCurrencyModalOpen}
          currencyModalHandler={currencyModalHandler}
        />
      )}
      {isContactsModalOpen && (
        <ContactsModal
          isContactsModalOpen={isContactsModalOpen}
          contactsModalHandler={contactsModalHandler}
        />
      )}
      {isAccountModalLoginOpen && (
        <LoginModal
          toggleBetweenModals={toggleBetweenModals}
          isAccountModalLoginOpen={isAccountModalLoginOpen}
          accountModalLoginHandler={accountModalLoginHandler}
        />
      )}
      {isAccountModalOpen && (
        <AccountModal
          toggleBetweenModals={toggleBetweenModals}
          isAccountModalOpen={isAccountModalOpen}
          accountModalHandler={accountModalHandler}
        />
      )}
      {isRecoveryModalOpen && <RecoveryModal />}
      <nav className={styles.navbar}>
        <div className={styles.navbar__side}>
          {desktopScreen ? (
            <>
              {pageLinksArray.slice(0, 2).map((link, i) => (
                <Link
                  key={i}
                  href={link.path}
                  className={styles.link}
                >
                  {link.title}
                </Link>
              ))}
            </>
          ) : (
            <MenuIcon
              isMobileMenuClose={isMobileMenuClose}
              mobileMenuHandler={mobileMenuHandler}
            />
          )}
        </div>
        <Link
          href="/"
          className={styles.logo}
        >
          <Image
            src={LogoImg}
            className={styles.logo__image}
            alt="Logo"
            priority
          />
        </Link>
        <div className={styles.navbar__side}>
          {desktopScreen ? (
            <>
              <button className={`${styles.link} ${styles.favourite_icon}`} />
              {isAuthenticated ? (
                <>
                  <Link
                    href="/"
                    className={`${styles.userLoggedNavLink} ${styles.link}`}
                  >
                    {userInfoToken &&
                      `${userInfoToken.given_name} ${userInfoToken.family_name}`}
                    <ul className={styles.userLoggedNavLink__subMenu}>
                      <li className={styles.userLoggedNavLink__item}>
                        <button
                          onClick={userLogout}
                          className={`${styles.link} `}
                        >
                          Sign out
                        </button>
                      </li>
                    </ul>
                  </Link>
                </>
              ) : (
                <button
                  type="button"
                  onClick={accountModalHandler}
                  className={`${styles.link} ${styles.link__button}`}
                >
                  My account
                </button>
              )}
              <button
                type="button"
                onClick={currencyModalHandler}
                className={`${styles.link} ${styles.link__button}`}
              >
                {`Split currency / ${selectedCurrency}`}
              </button>
              <button
                type="button"
                onClick={contactsModalHandler}
                className={`${styles.link} ${styles.link__button}`}
              >
                Contacts
              </button>
            </>
          ) : (
            <>
              {isAuthenticated ? (
                <Link
                  href="/"
                  className={`${styles.link} ${styles.account_icon}`}
                ></Link>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={accountModalHandler}
                    className={`${styles.link} ${styles.account_icon}`}
                  />
                </>
              )}
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
