import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const FavoritesContext = createContext({
  favoriteMovies: [],
  addFavorite: (movie) => this.favoriteMovies.concat(movie),
  removeFavorite: (movieId) => this.favoriteMovies.filter((movie) => movie.id !== movieId),
  isFavorite: (movieId) => this.favoriteMovies.some((movie) => movie.id !== movieId),
});

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (movie) => {
    setFavorites((oldFavorites) => oldFavorites.concat(movie));
  };

  const removeFavorite = (id) => {
    setFavorites((oldFavorites) => (
      oldFavorites.filter((favorite) => id !== favorite.id)
    ));
  };

  const isFavorite = (id) => favorites.some((favorite) => id === favorite.id);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    favoriteMovies: favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
  return <FavoritesContext.Provider value={context}>{children}</FavoritesContext.Provider>;
}

FavoritesContextProvider.defaultProps = {
  children: {},
};

FavoritesContextProvider.propTypes = {
  children: PropTypes.shape({}),
};

export default FavoritesContext;
