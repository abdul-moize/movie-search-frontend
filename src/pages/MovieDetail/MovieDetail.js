import styled from '@emotion/styled';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Checkbox, CircularProgress, FormControlLabel, Stack, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MovieList from '../../components/MovieList';
import MovieReviews from '../../components/MovieReviews';
import PersonCard from '../../components/PersonCard/PersonCard';
import { getMovieDetail, getSimilarMovies } from '../../services/movieService';
import FavoritesContext from '../../context/FavoritesContext';

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

const IconStyles = `
  width: 30px;
  height: 30px;
  margin: 10px;
  margin-left: 0;
`;

const Icon = styled.img`${IconStyles}`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  margin-left: ${({ index }) => (index > 0 ? 5 : 0)}px;
  &: hover {
    text-decoration: underline;
  }
`;

const MovieDetailsContainer = styled(Stack)`
  flex-direction: row;
  width: 80%;
  margin: auto;
`;

const FavoriteIcon = styled(Favorite)`
  width: 100%;
  height: 100%;
`;

const FavoriteIconBorder = styled(FavoriteBorder)`
  width: 100%;
  height: 100%;
`;

const FavoriteBox = styled(Checkbox)`
  ${IconStyles}
  width: 40px;
  height: 40px;
  padding: 0px;
  color: white;
  &.Mui-checked {
    color: #00acc1;
  }
`;

const FavoriteBoxContainer = styled(FormControlLabel)`
  margin: 0px;
`;
export default function MovieDetail() {
  const id = parseInt(useParams().id, 10);

  const { addFavorite, removeFavorite, isFavorite } = useContext(FavoritesContext);
  const [movieDetails, setMovieDetails] = useState({ loading: true, found: false });

  const toggleFavorite = () => {
    if (isFavorite(id)) {
      removeFavorite(id);
    } else {
      addFavorite({ ...movieDetails });
    }
  };

  useEffect(() => {
    setMovieDetails({ loading: true });
    getMovieDetail(id).then((movieData) => {
      setMovieDetails({ ...movieData, loading: false, found: true });
    }).catch((err) => {
      setMovieDetails({ loading: false, found: false, err });
    });
  }, [id]);
  return (
    <Stack color="#00acc1" key={id}>
      {!movieDetails.loading && movieDetails.found && (
        <>
          <MovieDetailsContainer>
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
                <FavoriteBoxContainer
                  control={(
                    <FavoriteBox
                      icon={<FavoriteIconBorder />}
                      checkedIcon={<FavoriteIcon />}
                      checked={isFavorite(id)}
                      onChange={toggleFavorite}
                    />
                  )}
                  label={`Add${isFavorite(id) ? 'ed' : ''} To Favorites`}
                />
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
                    <CustomLink to={`/genre/${id}/${name}`} index={index}>{name}</CustomLink>
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
          </MovieDetailsContainer>
          <MovieReviews />
          <MovieList api={getSimilarMovies(id)} title="similar" />
        </>
      )}
      {movieDetails.loading && (
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
      )}
      {!movieDetails.loading && !movieDetails.found && (
        <MovieDetailsContainer>
          <Typography color="white" textAlign="center">Movie not found</Typography>
        </MovieDetailsContainer>
      )}
    </Stack>
  );
}
