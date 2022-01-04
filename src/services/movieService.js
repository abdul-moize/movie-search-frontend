import { IMAGE_API_BASE, LATEST_MOVIES_API, TOP_RATED_MOVIES_API } from '../constants';

const getMovies = async (api, page = 1) => {
  try {
    const movies = await (await fetch(`${api}${page}`)).json();
    return {
      pages: movies.total_pages,
      movies: movies.results.map((movie) => ({
        img: `${IMAGE_API_BASE}/original${movie.poster_path}`,
        href: `/movie/${movie.id}`,
        title: movie.title,
        id: movie.id,
      })),
    };
  } catch (error) {
    throw error.message;
  }
};

export const getLatestMovies = getMovies.bind(null, LATEST_MOVIES_API);

export const getTopRatedMovies = getMovies.bind(null, TOP_RATED_MOVIES_API);
