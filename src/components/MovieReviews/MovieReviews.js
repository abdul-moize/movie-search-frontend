import React, { useEffect, useState } from 'react';
import { CircularProgress, Pagination, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../services/movieService';

export default function MovieReviews() {
  const { id } = useParams();

  const [state, setState] = useState({ loading: true, pages: 5, page: 1 });
  useEffect(() => {
    getReviews(id, state.page).then((reviews) => {
      setState({ ...reviews, loading: false });
    });
  }, []);
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography variant="h6" alignSelf="flex-start" marginLeft="10.5%">
        REVIEWS
      </Typography>
      {state.loading && <CircularProgress />}
      {!state.loading && state.reviews.map(({ name, avatar, review }) => (
        <Stack
          flexDirection="row"
          key={name}
          width="80%"
          margin="10px"
          style={{ background: '1d1d1d' }}
        >
          <Stack
            width="20%"
            alignItems="center"
            justifyContent="center"
            border="solid 10px"
            borderColor="#8e95a5"
          >
            <img src={avatar} alt="NA" width="50%" />
            <Typography>{name}</Typography>
          </Stack>
          <Typography
            color="white"
            width="80%"
            padding="10px"
            border="solid 10px"
            borderColor="#8e95a5"
          >
            {review}
          </Typography>
        </Stack>
      ))}
      {!state.loading && (state.pages > 1 ? (
        <Pagination
          count={state.pages}
          color="primary"
          shape="rounded"
          size="large"
          sx={{ marginBottom: '10px' }}
          onChange={(e, p) => {
            setState({ ...state, page: p, loading: true });
            getReviews(p).then((reviews) => {
              setState(reviews);
            });
          }}
        />
      ) : (
        state.reviews.length === 0 && (
          <Typography color="white">No reviews found</Typography>
        )
      ))}
    </Stack>
  );
}
