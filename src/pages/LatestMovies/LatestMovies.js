import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Pagination, Typography } from '@mui/material';
import MovieCard from '../../components/MovieCard';
import getLatestMovies from '../../services/movieService';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #1e2129;
  display: flex;
  overflow: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const MoviesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 90%;
  align-items: center;
  justify-content: center;
  margin: 10px;
`;

const TitleContainer = styled(Typography)`
  margin: 10px;
  color: #00acc1;
  text-align: left;
  border-radius: 5px;
`;

function LatestMovies() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const loadMovies = (page) => {
    getLatestMovies(page).then((data) => {
      setMovies(data.movies);
      setTotalPages(data.pages);
    });
  };
  useEffect(() => {
    loadMovies(1);
  }, []);
  return (
    <Container>
      <TitleContainer variant="h6">LATEST MOVIES</TitleContainer>
      <MoviesContainer>
        {movies.length !== 0 && movies.map((movie) => <MovieCard movie={movie} key={movie.id} />)}
      </MoviesContainer>
      <Pagination
        count={totalPages}
        color="primary"
        shape="rounded"
        size="large"
        sx={{ marginBottom: '10px' }}
        onChange={(e, p) => {
          loadMovies(p);
        }}
      />
    </Container>
  );
}

export default LatestMovies;
