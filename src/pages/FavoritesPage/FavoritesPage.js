import React, { useContext } from 'react';
import MovieList from '../../components/MovieList';
import FavoritesContext from '../../context/FavoritesContext';

export default function FavoritesPage() {
  const { favoriteMovies } = useContext(FavoritesContext);
  return (
    <MovieList key={favoriteMovies} moviesList={favoriteMovies} title="favorite" />
  );
}
