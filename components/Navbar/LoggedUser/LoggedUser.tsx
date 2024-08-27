import { useEffect, useState } from 'react';
import { Popover } from 'antd';
import { useAuth } from '@/context/AuthContext';
import { useFavourite } from '@/context/FavouriteYachtsContext';
import styles from '@/components/Navbar/navbar.module.scss';
import useWindowDimensions from '@/hooks/useWindowDimensions';
import { useModals } from '@/context/ModalsContext';

const LoggedUser = () => {
  const [desktopScreen, setDesktopScreen] = useState(true);
  const { width } = useWindowDimensions();
  const { userLogout, userInfoToken, isAuthenticated } = useAuth();
  const { clearFavouriteList } = useFavourite();
  const [open, setOpen] = useState(false);
  const { accountModalLoginHandler } = useModals();

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };

  const handleLogOut = () => {
    userLogout(), clearFavouriteList();
  };

  useEffect(() => {
    const screen = (width as number) < 1200;
    setDesktopScreen(!screen);
  }, [width]);

  return (
    <>
      {isAuthenticated && (
        <Popover
          content={
            <div className={styles.userLoggedNavLink__userInfo}>
              <h2>{`Hello, ${userInfoToken?.given_name}!\nIt’s nice to see you`}</h2>
              <ul className={styles.userLoggedNavLink__subMenu}>
                <li className={styles.userLoggedNavLink__item}>
                  <span
                    className={`${styles.link} ${styles.logout_icon}`}
                  ></span>
                  <button
                    onClick={handleLogOut}
                    className={`${styles.link} `}
                  >
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          }
          trigger='click'
          open={open}
          onOpenChange={handleOpenChange}
        >
          <button
            className={`${styles.userLoggedNavLink} ${styles.link} ${styles.link__account}`}
          >
            {userInfoToken &&
              desktopScreen &&
              `${userInfoToken.given_name} ${userInfoToken.family_name}`}
          </button>
        </Popover>
      )}
      {!isAuthenticated && (
        <>
          <button
            type='button'
            onClick={accountModalLoginHandler}
            className={`${styles.link} ${styles.link__account}`}
          >
            {desktopScreen && 'My account'}
          </button>
        </>
      )}
    </>
  );
};

export default LoggedUser;
