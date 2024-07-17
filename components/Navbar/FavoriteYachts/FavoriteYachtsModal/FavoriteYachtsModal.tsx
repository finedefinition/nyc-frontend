import Link from 'next/link';
import Image from 'next/image';
import classNames from 'classnames';
import { Vessel } from '@/interfaces/vessel.interface';
import FYCard from '@/components/FYCard/FYCard';
import styles from '@/components/FYCard/fycard.module.scss';

import Close from '@/public/icons/close.svg';

import { useModals } from '@/context/ModalsContext';
import { useFavourite } from '@/context/FavouriteYachtsContext';
import Loader from '@/components/Loader/Loader';
import { useAuth } from '@/context/AuthContext';

const FavoriteYachtsModal = () => {
  const { favouriteModalHandler, accountModalLoginHandler } = useModals();
  const { favouriteList, isLoadingFavourite } = useFavourite();

  const { isAuthenticated } = useAuth();

  return (
    <div className={styles.favoriteModal}>
      <>
        <div className={styles.favoriteModal__top}>
          <p className={styles.favoriteModal__top_title}>Your list</p>
          <Image
            src={Close}
            className={styles.close}
            alt='Close'
            onClick={() => favouriteModalHandler(false)}
          />
        </div>
        {!isLoadingFavourite && isAuthenticated && favouriteList.length > 0 && (
          <ul className={styles.favoriteModal__yachts}>
            {favouriteList.slice(0, 5).map((yacht: Vessel | null) => {
              return (
                <li
                  key={yacht?.yacht_id}
                  className={classNames(
                    `${styles.favoriteModal__yachts_yacht}`
                  )}
                >
                  {yacht && (
                    <FYCard
                      yacht={yacht}
                      inCatalog={true}
                      inFavourite
                    />
                  )}
                </li>
              );
            })}
          </ul>
        )}
        {isLoadingFavourite && (
          <div className={styles.loading}>
            <Loader biggest />
          </div>
        )}
        {!isLoadingFavourite && !favouriteList.length && (
          <p
            className={classNames(styles.noYachts, {
              [styles.noYachts__underline]: !isLoadingFavourite,
            })}
          >
            {isAuthenticated
              ? 'The list is currently empty'
              : 'Log in to explore the most beautiful yachts'}
          </p>
        )}

        {!isAuthenticated && (
          <button
            className={styles.favoriteModal__button}
            onClick={() => {
              accountModalLoginHandler(), favouriteModalHandler(false);
            }}
          >
            Sign In
          </button>
        )}

        {favouriteList.length > 0 && isAuthenticated && (
          <div className={styles.favoriteModal__bottom}>
            <Link href={'/catalogue'}>Show more on User page</Link>
          </div>
        )}
      </>
    </div>
  );
};

export default FavoriteYachtsModal;
