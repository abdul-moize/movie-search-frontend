/* eslint-disable camelcase */
import {
  GET_CREDIT_API,
  GET_MOVIE_API,
  GET_REVIEWS_API,
  GET_SIMILAR_MOVIES_API,
  IMAGE_API_BASE,
  LATEST_MOVIES_API,
  POPULAR_MOVIES_API,
  TOP_RATED_MOVIES_API,
} from '../constants';

const extractData = (movie) => ({
  img: `${IMAGE_API_BASE}/w500${movie.poster_path}`,
  href: `/movie/${movie.id}`,
  title: movie.title,
  id: movie.id,
  genres: movie.genres,
  runtime: `${movie.runtime} min`,
  releaseDate: movie.release_date,
  rating: movie.vote_average,
  overview: movie.overview,
});

const getMovies = async (api, page = 1) => {
  try {
    const movies = await (await fetch(`${api}${page}`)).json();
    return {
      pages: movies.total_pages,
      movies: movies.results.map((movie) => extractData(movie)),
    };
  } catch (error) {
    throw error.message;
  }
};

export const getLatestMovies = getMovies.bind(null, LATEST_MOVIES_API);

export const getTopRatedMovies = getMovies.bind(null, TOP_RATED_MOVIES_API);

export const getPopularMovies = getMovies.bind(null, POPULAR_MOVIES_API);

export const getMovieDetail = async (id) => {
  const movieData = await (await fetch(GET_MOVIE_API.replace('id', id))).json();
  const movieCast = await (
    await fetch(GET_CREDIT_API.replace('id', id))
  ).json();
  const [cast, director] = [
    movieCast.cast.slice(0, 5).map(({ name, profile_path, character, id }) => ({
      name,
      img: `${IMAGE_API_BASE}/w185${profile_path}`,
      character,
      href: `/actor/${id}`,
    })),
    movieCast.crew.filter((person) => person.job === 'Director').map(({ name, profile_path, id }) => ({
      name,
      img: `${IMAGE_API_BASE}/w185${profile_path}`,
      href: `/director/${id}`,
    })),
  ];
  return {
    ...extractData(movieData),
    cast,
    director,
  };
};

export const getSimilarMovies = (id) => getMovies.bind(null, GET_SIMILAR_MOVIES_API.replace('id', id));

const extractReviewData = ({ author_details, content, updated_at }) => ({
  name: author_details.username,
  review: content,
  avatar: author_details.avatar_path.slice(1),
  date: updated_at,
});

export const getReviews = async (id, page = 1) => {
  const reviews = await (await fetch(`${GET_REVIEWS_API.replace('id', id)}${page}`)).json();
  return {
    pages: reviews.total_pages,
    reviews: reviews.results.map((review) => extractReviewData(review)),
  };
};
