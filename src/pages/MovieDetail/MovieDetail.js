import styled from '@emotion/styled';
import { CircularProgress, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieList from '../../components/MovieList';
import MovieReviews from '../../components/MovieReviews';
import PersonCard from '../../components/PersonCard/PersonCard';
import { getMovieDetail, getSimilarMovies } from '../../services/movieService';

const Image = styled.img`
  width: 25%;
  height: 50%;
  border-radius: 20px;
  margin: 0.5%;
`;

const DetailContainer = styled.div`
  width: 100%;
  display: flex;
  margin: 5px;
`;

const Icon = styled.img`
  width: 30px;
  height: 30px;
  margin: 10px;
  margin-left: 0;
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-left: ${({ index }) => (index > 0 ? 5 : 0)}px;
  &: hover {
    text-decoration: underline;
  }
`;

export default function MovieDetail() {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({ loading: true });
  useEffect(() => {
    setMovieDetails({ loading: true });
    getMovieDetail(id).then((movieData) => {
      setMovieDetails({ ...movieData, loading: false });
    });
  }, [id]);
  return (
    <Stack color="#00acc1" key={id}>
      {!movieDetails.loading ? (
        <>
          <Stack flexDirection="row" width="80%" margin="auto">
            <Image src={movieDetails.img} alt={movieDetails.title} />
            <Stack width="70%" margin={3}>
              <Typography variant="h5">{movieDetails.title}</Typography>
              <Typography variant="subtitle1" color="#8e95a5">
                {movieDetails.overview}
              </Typography>
              <DetailContainer>
                <Icon src="/star.png" alt="rating" title="rating" />
                <Typography variant="h6" margin="10px">
                  {movieDetails.rating}
                </Typography>
              </DetailContainer>
              <DetailContainer>
                <Icon src="/text.png" alt="runtime" title="duration" />
                <Typography variant="h6" margin="10px">{movieDetails.runtime}</Typography>
              </DetailContainer>
              <DetailContainer>
                <Typography color="#8e95a5" width="20%">Release Date</Typography>
                <Typography>{movieDetails.releaseDate}</Typography>
              </DetailContainer>
              <DetailContainer>
                <Typography color="#8e95a5" width="20%">Genres</Typography>
                {movieDetails.genres.map(({ name, id }, index) => (
                  <React.Fragment key={name}>
                    {index > 0 && ','}
                    <CustomLink to={`/genre/${id}`} index={index}>{name}</CustomLink>
                  </React.Fragment>
                ))}
              </DetailContainer>
              <DetailContainer>
                <Typography color="#8e95a5" width="20%">Cast</Typography>
                <Stack flexDirection="row" flexWrap="wrap" width="80%">
                  {movieDetails.cast.map((person) => (
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    <PersonCard {...person} key={person.name} />
                  ))}
                </Stack>
              </DetailContainer>
              <DetailContainer>
                <Typography color="#8e95a5" width="20%">Director</Typography>
                <Stack flexDirection="row" flexWrap="wrap" width="80%">
                  {movieDetails.director.map((person) => (
                    /* eslint-disable-next-line react/jsx-props-no-spreading */
                    <PersonCard {...person} key={person.name} />
                  ))}
                </Stack>
              </DetailContainer>
            </Stack>
          </Stack>
          <MovieReviews />
          <MovieList api={getSimilarMovies(id)} title="similar" />
        </>
      ) : (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
    </Stack>
  );
}
