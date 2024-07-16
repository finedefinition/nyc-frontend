import classNames from 'classnames';
import styles from '@/components/Navbar/navbar.module.scss';
import { useFavourite } from '@/context/FavouriteYachtsContext';
import { useModals } from '@/context/ModalsContext';
import { useAuth } from '@/context/AuthContext';

type Props = {
  children?: React.ReactNode;
};

const FavoriteYachtsButton = ({ children }: Props) => {
  const { favouriteModalHandler, isFavouriteModalOpen } = useModals();
  const { favouriteList } = useFavourite();
  const { isAuthenticated } = useAuth();
  const favoriteYachtCount = favouriteList.length ?? 0;

  return (
    <div className={`${styles.favourite_popup}`}>
      <>
        <button
          className={classNames(styles.link, {
            [styles.favourite_popup__icon]: !isAuthenticated,
            [styles.favourite_popup__icon_login]: isAuthenticated,
            [styles.favourite_popup__icon_loginActive]:
              isAuthenticated && isFavouriteModalOpen,
            [styles.favourite_popup__icon_notLoginActive]:
              !isAuthenticated && isFavouriteModalOpen,
          })}
          onClick={() => {
            favouriteModalHandler(true);
          }}
        >
          <span>
            {favoriteYachtCount > 0 && isAuthenticated && favoriteYachtCount}
          </span>
        </button>
      </>
      {children}
    </div>
  );
};

export default FavoriteYachtsButton;
