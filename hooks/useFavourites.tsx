import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVOURITES_KEY = 'favourite_schools';

type FavouritesContextType = {
  favourites: Set<number>;
  toggleFavourite: (schoolNo: number) => void;
  isFavourite: (schoolNo: number) => boolean;
};

const FavouritesContext = createContext<FavouritesContextType>({
  favourites: new Set(),
  toggleFavourite: () => {},
  isFavourite: () => false,
});

export const FavouritesProvider = ({ children }: { children: React.ReactNode }) => {
  const [favourites, setFavourites] = useState<Set<number>>(new Set());

  useEffect(() => {
    AsyncStorage.getItem(FAVOURITES_KEY).then((saved) => {
      if (saved) {
        setFavourites(new Set(JSON.parse(saved)));
      }
    });
  }, []);

  const toggleFavourite = useCallback((schoolNo: number) => {
    setFavourites((prev) => {
      const next = new Set(prev);
      if (next.has(schoolNo)) {
        next.delete(schoolNo);
      } else {
        next.add(schoolNo);
      }
      AsyncStorage.setItem(FAVOURITES_KEY, JSON.stringify([...next]));
      return next;
    });
  }, []);

  const isFavourite = useCallback((schoolNo: number) => {
    return favourites.has(schoolNo);
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite, isFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => useContext(FavouritesContext);
