'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { fetchImgUrl } from '@/utils/api/getImageFromAWS';
import typo from '@/styles/typography.module.scss';
import { Vessel } from '@/interfaces/vessel.interface';
import { useAuth } from '@/context/AuthContext';
import { useModals } from '@/context/ModalsContext';
import { useFavourite } from '@/context/FavouriteYachtsContext';
import {
  createFavouriteYachts,
  deleteFavouriteYacht,
} from '@/utils/api/usersAuth';
import {
  LOCAL_STORAGE_SESSION_TIME,
  LOCAL_STORAGE_TOKEN_KEY,
} from '@/utils/constants';
import YachtPrice from '../YachtPrice/YachtPrice';
import Button from '../Button/Button';
import CardSkeleton from '../CardSkeleton/CardSkeleton';
import Loader from '../Loader/Loader';
import styles from './fycard.module.scss';
import TopRightLabel from './TopRightLabel';
const IMAGE_600_400 = 'https://fakeimg.pl/600x400?text=Norse+Yacht+Co.';

interface Props {
  yacht: Vessel;
  inCatalog?: boolean;
  inFavourite?: boolean;
  isLoadingFavourite?: boolean;
}

const FYCard = ({ yacht, inCatalog, inFavourite }: Props) => {
  // const [isLoading, setIsLoading] = useState(true);
  const [isLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const router = useRouter();
  const { isAuthenticated, userInfoToken, userLogout } = useAuth();
  const { accountModalLoginHandler, isFavouriteModalOpen } = useModals();
  const {
    createFavourite,
    deleteFavourite,
    favouriteList,
    isLoadingFavourite,
  } = useFavourite();

  const TOKEN =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
      : null;

  const EXP_TIME =
    typeof localStorage !== 'undefined'
      ? localStorage.getItem(LOCAL_STORAGE_SESSION_TIME)
      : null;

  const {
    yacht_id,
    yacht_top,
    yacht_hot_price,
    yacht_price,
    yacht_price_old,
    yacht_main_image_key,
    yacht_make,
    yacht_model,
    yacht_country,
    yacht_town,
    yacht_year,
  } = yacht;

  // activated loader only in modal during removing
  const removingInModal = isRemoving && isFavouriteModalOpen && inFavourite;
  // activated loader only on catalog page during removing
  const removing = isRemoving && !isFavouriteModalOpen;
  const activatedLoader = (isAdding || removing) && !removingInModal;

  const addedInFavourite = favouriteList.find(
    (yacht) => yacht?.yacht_id === yacht_id
  );

  useEffect(() => {
    async function loadImgFromAws() {
      const currImg = await fetchImgUrl(yacht_main_image_key);
      setImageUrl(currImg.length ? currImg : IMAGE_600_400);
      // setTimeout(() => {
      //   setIsLoading(false);
      // }, 1500);
    }
    loadImgFromAws();
  }, [yacht_main_image_key]);

  const routeToVessel = () => {
    router.push(`/catalogue/${yacht_id}?name=${yacht_make}`);
  };

  const now = Math.floor(new Date().getTime() / 1000);

  const handleDeleteFavourite = (id: number) => {
    if (userInfoToken?.sub && id && TOKEN) {
      setIsRemoving(true);
      deleteFavouriteYacht(userInfoToken?.sub, id, TOKEN)
        .then(() => {
          deleteFavourite(yacht);
        })
        .catch((error) => {
          if (EXP_TIME && now > +EXP_TIME) {
            userLogout();
          }
          alert(error);
        })
        .finally(() => {
          setIsRemoving(false);
        });
    }
  };

  const handleCreateFavourite = (yacht: Vessel) => {
    if (userInfoToken?.sub && yacht_id && TOKEN) {
      setIsAdding(true);
      createFavouriteYachts(userInfoToken?.sub, yacht_id, TOKEN)
        .then(() => {
          createFavourite(yacht);
        })
        .catch((error) => {
          if (EXP_TIME && now > +EXP_TIME) {
            userLogout();
          }
          alert(error);
        })
        .finally(() => {
          setIsAdding(false);
        });
    }
  };

  return (
    <div
      className={classNames(styles.card, {
        [styles.adding]: activatedLoader,
        [styles.removing]: isRemoving,
      })}
    >
      {activatedLoader && (
        <Loader
          biggest
          absoluteCenter
          zIndex
        />
      )}
      {removingInModal && <Loader absoluteCenter />}
      {isLoading ? (
        inFavourite ? (
          <CardSkeleton isFavourite />
        ) : (
          <CardSkeleton />
        )
      ) : (
        <>
          <div
            className={classNames(styles.image_container, {
              [styles.image_catalog_container]: inCatalog,
            })}
            onClick={routeToVessel}
          >
            <Image
              src={imageUrl}
              fill
              sizes='100vw'
              className={styles.image}
              alt='feature_img'
            />
            <span className={styles.top_right}>
              <TopRightLabel
                yacht_top={yacht_top}
                yacht_hot_price={yacht_hot_price}
              />
            </span>
            <span className={styles.center}>
              <Button
                text='See Detail'
                linkTo={`/catalogue/${yacht_id}?name=${yacht_make}`}
                primary
              />
            </span>
          </div>
          <div
            className={`${
              inCatalog ? styles.card__desc_catalog : styles.card__desc
            }`}
          >
            <Link
              className={`${typo.typo_name_yacht} ${styles.card__name}`}
              href={{
                pathname: `/catalogue/${yacht_id}`,
                query: { name: yacht_make },
              }}
            >
              <span>{yacht_make}</span>
              <br />
              <span>{yacht_model}</span>
            </Link>
            <span className={styles.price}>
              <YachtPrice
                price={yacht_price}
                old_price={yacht_price_old}
              />
            </span>
            <p
              className={`${typo.typo_description} ${typo.typo_description_gray}  ${styles.card__typo}`}
            >
              {`${yacht_country}, ${yacht_town} | ${yacht_year}`}
            </p>
            {isAuthenticated && isLoadingFavourite && (
              <div className={styles.loadFavourite}>
                <Loader absoluteCenter />
              </div>
            )}
            {isAuthenticated && !isLoadingFavourite && (
              <button
                className={classNames(styles.favourite_icon, {
                  [styles.favourite_icon_added]: !!addedInFavourite,
                })}
                onClick={() => {
                  addedInFavourite
                    ? handleDeleteFavourite(yacht_id)
                    : handleCreateFavourite(yacht);
                }}
                disabled={isRemoving}
              />
            )}
            {!isAuthenticated && (
              <>
                <button
                  className={`${styles.favourite_icon}`}
                  onClick={accountModalLoginHandler}
                />
              </>
            )}
          </div>
          {inFavourite && (
            <button
              className={styles.trash}
              onClick={() => handleDeleteFavourite(yacht_id)}
              disabled={isRemoving}
            />
          )}
        </>
      )}
    </div>
  );
};

export default FYCard;
