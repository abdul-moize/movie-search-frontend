import { IMAGE_API_BASE, LATEST_MOVIES_API } from '../constants';

const getLatestMovies = async (page = 1) => {
  try {
    const movies = await (await fetch(`${LATEST_MOVIES_API}${page}`)).json();
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

export default getLatestMovies;
