import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Pagination, Typography } from '@mui/material';
import MovieCard from '../MovieCard';

const Container = styled.div`
  width: 100%;
  display: flex;
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

function MovieList({ api, title }) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const loadMovies = (page) => {
    api(page).then((data) => {
      setMovies(data.movies);
      setTotalPages(data.pages);
    });
  };
  useEffect(() => {
    loadMovies(1);
  }, []);
  return (
    <Container height={window.innerHeight}>
      <Link to={`/${title}`} style={{ textDecoration: 'none' }}>
        <TitleContainer variant="h6">{`${title.toUpperCase()} MOVIES`}</TitleContainer>
      </Link>
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

MovieList.defaultProps = {
  api: () => {},
  title: '',
};

MovieList.propTypes = {
  api: PropTypes.func,
  title: PropTypes.string,
};

export default MovieList;
