import { createContext } from 'react';
import BookItem from '../interfaces/bookTypes';
import React, { useContext, useEffect, useState } from 'react';


interface FavoriteBooksContextType {
  favorites: BookItem[];
  addFavorite: (book: BookItem) => void;
  removeFavorite: (key: string) => void;
  isFavorite: (key: string) => boolean;
}

const FavoriteBooksContext = createContext<FavoriteBooksContextType | undefined>(undefined);

export const FavoriteBooksProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<BookItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('@favorites');
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const updateStorage = (list: BookItem[]) => {
    setFavorites(list);
    localStorage.setItem('@favorites', JSON.stringify(list));
  };

  const addFavorite = (book: BookItem) => {
    if (favorites.some(fav => fav.key === book.key)) return;
    const updated = [...favorites, book];
    updateStorage(updated);
  };

  const removeFavorite = (key: string) => {
    const updated = favorites.filter(book => book.key !== key);
    updateStorage(updated);
  };

  const isFavorite = (key: string) => {
    return favorites.some(book => book.key === key);
  };

  return (
    <FavoriteBooksContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoriteBooksContext.Provider>
  );
};

export function useFavoriteBooks() {
  const context = useContext(FavoriteBooksContext);
  if (!context) {
    throw new Error('useFavoriteBooks deve ser usado dentro de <FavoriteBooksProvider>');
  }
  return context;
}
