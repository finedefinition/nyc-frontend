'use client';

import React, { useContext, useState } from 'react';
import { Vessel } from '@/interfaces/vessel.interface';

type FavouriteContenxtType = {
  favouriteList: (Vessel | null)[];
  isLoadingFavourite: boolean;
  onCreateFavouriteList: (list: (Vessel | null)[]) => void;
  createFavourite: (yacht: Vessel) => void;
  deleteFavourite: (yacht: Vessel) => void;
  isFavouriteLoading: () => void;
  isFavouriteLoaded: () => void;
};

const FavouriteContext = React.createContext<FavouriteContenxtType | undefined>(
  undefined
);

type Props = {
  children: React.ReactNode;
};

export const FavouriteYachtsProvider: React.FC<Props> = ({ children }) => {
  const [favouriteList, setFavouriteList] = useState<(Vessel | null)[]>([]);
  const [isLoadingFavourite, setIsLoadingFavourite] = useState(false);

  const onCreateFavouriteList = (list: (Vessel | null)[]) => {
    setFavouriteList(list);
  };

  const createFavourite = (yacht: Vessel) => {
    setFavouriteList((prev) => [...prev, yacht]);
  };

  const deleteFavourite = (yacht: Vessel) => {
    setFavouriteList((prev) =>
      prev.filter((item) => item?.yacht_id !== yacht.yacht_id)
    );
  };

  const isFavouriteLoading = () => {
    setIsLoadingFavourite(true);
  };

  const isFavouriteLoaded = () => {
    setIsLoadingFavourite(false);
  };

  return (
    <FavouriteContext.Provider
      value={{
        favouriteList,
        isLoadingFavourite,
        onCreateFavouriteList,
        createFavourite,
        deleteFavourite,
        isFavouriteLoading,
        isFavouriteLoaded,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourite = (): FavouriteContenxtType => {
  const context = useContext(FavouriteContext);
  if (!context) {
    throw new Error('useFavourite must be used within a AuthContextProvider');
  }
  return context;
};
