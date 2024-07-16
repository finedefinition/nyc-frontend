'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Modal } from 'antd';
import LogoImg from '@/public/icons/logo.svg';
import { pageLinksArray } from '@/utils/links/pageLinks';
import { useCurrency } from '@/context/CurrencyContext';
import MenuMobileModal from '@/components/Navbar/MenuMobileModal/MenuMobileModal';
import MenuIcon from '@/components/Navbar/MenuIcon/MenuIcon';
import ContactsModal from '@/components/Navbar/ContactsModal/ContactsModal';
import CurrencyModal from '@/components/Navbar/CurrencyModal/CurrencyModal';
import styles from '@/components/Navbar/navbar.module.scss';

import { useAuth } from '@/context/AuthContext';
import { useModals } from '@/context/ModalsContext';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import AccountModal from './AccountModal/AccountModal';
import LoginModal from './LoginModal/LoginModal';
import RecoveryModal from './RecoveryModal/RecoveryModal';
import FavoriteYachts from './FavoriteYachts/FavoriteYachts';

const Navbar = () => {
  const [isCurrencyModalOpen, setIsCurrencyModalOpen] = useState(false);
  const [isContactsModalOpen, setIsContactsModalOpen] = useState(false);
  const [isMobileMenuClose, setIsMobileMenuClose] = useState(false);
  const [desktopScreen, setDesktopScreen] = useState(true);
  const { isAuthenticated, userLogout, userInfoToken } = useAuth();
  const {
    isAccountModalOpen,
    isAccountModalLoginOpen,
    isRecoveryModalOpen,
    recoveryPasswordHandler,
    accountModalHandler,
    accountModalLoginHandler,
    toggleBetweenModals,
  } = useModals();
  const { width } = useWindowDimensions();
  const { selectedCurrency } = useCurrency();
  const isAdmin = userInfoToken?.['cognito:groups']
    ? userInfoToken?.['cognito:groups'][0]
    : null;

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

  const isUserAdmin = isAuthenticated && isAdmin === 'ROLE_ADMIN';

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

      <Modal
        open={isAccountModalLoginOpen}
        onCancel={accountModalLoginHandler}
        footer={false}
      >
        <LoginModal
          toggleBetweenModals={toggleBetweenModals}
          accountModalLoginHandler={accountModalLoginHandler}
        />
      </Modal>

      <Modal
        open={isAccountModalOpen}
        onCancel={accountModalHandler}
        footer={false}
      >
        <AccountModal
          toggleBetweenModals={toggleBetweenModals}
          accountModalHandler={accountModalHandler}
        />
      </Modal>

      <Modal
        open={isRecoveryModalOpen}
        onCancel={recoveryPasswordHandler}
        footer={false}
      >
        <RecoveryModal />
      </Modal>
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
          href='/'
          className={styles.logo}
        >
          <Image
            src={LogoImg}
            className={styles.logo__image}
            alt='Logo'
            priority
          />
        </Link>
        <div className={styles.navbar__side}>
          <FavoriteYachts />
          {desktopScreen && isAuthenticated && (
            <>
              <Link
                href='/'
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
          )}
          {desktopScreen && !isAuthenticated && (
            <>
              <button
                type='button'
                onClick={accountModalLoginHandler}
                className={`${styles.link} ${styles.link__button}`}
              >
                My account
              </button>
            </>
          )}
          {desktopScreen && (
            <>
              <button
                type='button'
                onClick={currencyModalHandler}
                className={`${styles.link} ${styles.link__button}`}
              >
                {`Split currency / ${selectedCurrency}`}
              </button>
              {isUserAdmin && (
                <Link
                  className={`${styles.link} ${styles.link__button}`}
                  href={{
                    pathname: `/admin/${userInfoToken?.given_name}${userInfoToken?.family_name}`,
                  }}
                >
                  Admin Page
                </Link>
              )}
              {(!isUserAdmin || !isAuthenticated) && (
                <button
                  type='button'
                  onClick={contactsModalHandler}
                  className={`${styles.link} ${styles.link__button}`}
                >
                  Contacts
                </button>
              )}
            </>
          )}
          {!desktopScreen && !isAuthenticated && (
            <button
              type='button'
              onClick={accountModalLoginHandler}
              className={`${styles.link} ${styles.account_icon}`}
            />
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
