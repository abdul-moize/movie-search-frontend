import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { CircularProgress, Pagination, Typography } from '@mui/material';
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
  width: 80%;
  margin: auto;
`;

const TitleContainer = styled(Typography)`
  margin: 10px;
  margin-left: 1%;
  color: #00acc1;
  text-align: left;
  border-radius: 5px;
`;

function MovieList({ api, title }) {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(10);
  const [isLoading, setIsLoading] = useState(true);

  const loadMovies = (page) => {
    api(page).then((data) => {
      setMovies(data.movies);
      setTotalPages(data.pages);
      setIsLoading(false);
    });
  };
  useEffect(() => {
    loadMovies(1);
  }, []);
  return (
    <Container>
      {title.includes('similar') ? (
        <TitleContainer variant="h6" style={{ alignSelf: 'flex-start', marginLeft: '10.5%' }}>
          {`${title.toUpperCase().replaceAll('_', ' ')} MOVIES`}
        </TitleContainer>
      ) : (
        <Link
          to={`/${title}`}
          style={{ textDecoration: 'none', width: '80%', margin: 'auto' }}
        >
          <TitleContainer variant="h6">{`${title.toUpperCase().replaceAll('_', ' ')} MOVIES`}</TitleContainer>
        </Link>
      )}

      {isLoading ? (
        <CircularProgress />
      ) : (
        <MoviesContainer>
          {movies.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </MoviesContainer>
      )}

      <Pagination
        count={totalPages}
        color="primary"
        shape="rounded"
        size="large"
        sx={{ marginBottom: '10px' }}
        onChange={(e, p) => {
          loadMovies(p);
          setIsLoading(true);
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