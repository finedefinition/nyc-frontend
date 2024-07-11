import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useFavourite } from '@/context/FavouriteYachtsContext';
import { getFavouriteYachts } from '@/utils/api/usersAuth';
import { getVesselById } from '@/utils/api/getAllVessels';
import { LOCAL_STORAGE_TOKEN_KEY } from '@/utils/constants';
import FavoriteYachtsButton from './FavoriteYachtsButton/FavoriteYachtsButton';
import FavoriteYachtsModal from './FavoriteYachtsModal/FavoriteYachtsModal';

export interface FavouriteYachts {
  userId: number;
  favouriteYachtIds: number[];
  count: number;
}

const FavoriteYachts = () => {
  const { onCreateFavouriteList, isFavouriteLoading, isFavouriteLoaded } =
    useFavourite();
  const { userInfoToken, isAuthenticated } = useAuth();

  useEffect(() => {
    const TOKEN =
      typeof localStorage !== 'undefined'
        ? localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
        : null;

    if (userInfoToken?.sub && isAuthenticated) {
      isFavouriteLoading();
      getFavouriteYachts(userInfoToken?.sub, TOKEN)
        .then((response) => {
          const yachtsData = response as FavouriteYachts | 0;
          if (yachtsData) {
            getFavouriteYachtsById(yachtsData);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfoToken?.sub]);

  const getFavouriteYachtsById = (yachtsData: FavouriteYachts) => {
    const favoriteYachtIds = yachtsData?.favouriteYachtIds ?? [];
    isFavouriteLoading();
    Promise.all(
      favoriteYachtIds.map((id) =>
        getVesselById(`/${id}`)
          .then((responseYachts) => responseYachts)
          .catch((error) => {
            alert(error);
            return null;
          })
      )
    )
      .then((allFavouriteYachts) => {
        onCreateFavouriteList(allFavouriteYachts);
      })
      .catch((error) => alert(error))
      .finally(() => {
        isFavouriteLoaded();
      });
  };

  return (
    <>
      <FavoriteYachtsButton>
        <FavoriteYachtsModal />
      </FavoriteYachtsButton>
    </>
  );
};

export default FavoriteYachts;
