const AUTH_API_BASE = process.env.REACT_APP_AUTH_API_DOMAIN;
export const LOGIN_API = `${AUTH_API_BASE}/login`;
export const REGISTER_API = `${AUTH_API_BASE}/register`;
export const REFRESH_TOKEN_API = `${AUTH_API_BASE}/token`;

const API_KEY = process.env.REACT_APP_API_KEY;
const MOVIE_API_BASE = process.env.REACT_APP_MOVIE_API_DOMAIN;
export const LATEST_MOVIES_API = `${MOVIE_API_BASE}/upcoming?api_key=${API_KEY}&page=`;
export const TOP_RATED_MOVIES_API = `${MOVIE_API_BASE}/top_rated?api_key=${API_KEY}&page=`;
export const IMAGE_API_BASE = process.env.REACT_APP_IMAGE_API_DOMAIN;
