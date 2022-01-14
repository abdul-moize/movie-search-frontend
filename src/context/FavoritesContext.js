import React, { useState, createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addToFavorites, getFavorites, removeFromFavorites } from '../services/movieService';
import { getRefreshToken, getToken } from '../redux/nodes/entities/user/selectors';
import { useTokenService } from '../services/authService';

const FavoritesContext = createContext({
  favoriteMovies: [],
  addFavorite: (movie) => this.favoriteMovies.concat(movie),
  removeFavorite: (movieId) => this.favoriteMovies.filter((movie) => movie.id !== movieId),
  isFavorite: (movieId) => this.favoriteMovies.some((movie) => movie.id !== movieId),
});

export function FavoritesContextProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  const token = useSelector(getToken);
  const refreshToken = useSelector(getRefreshToken);

  const dispatch = useDispatch();
  const addFavorite = (movie) => {
    useTokenService(addToFavorites.bind(null, movie), token, refreshToken, dispatch).then(() => {
      setFavorites((oldFavorites) => oldFavorites.concat(movie));
    });
  };

  const removeFavorite = (id) => {
    useTokenService(removeFromFavorites.bind(null, id), token, refreshToken, dispatch).then(() => {
      setFavorites((oldFavorites) => (
        oldFavorites.filter((favorite) => id !== favorite.id)
      ));
    });
  };

  const isFavorite = (id) => favorites.some((favorite) => id === favorite.id);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const context = {
    favoriteMovies: favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  useEffect(async () => {
    const { favorites } = await useTokenService(getFavorites, token, refreshToken, dispatch);
    setFavorites(() => favorites);
  }, []);
  return <FavoritesContext.Provider value={context}>{children}</FavoritesContext.Provider>;
}

FavoritesContextProvider.defaultProps = {
  children: {},
};

FavoritesContextProvider.propTypes = {
  children: PropTypes.shape({}),
};

export default FavoritesContext;
