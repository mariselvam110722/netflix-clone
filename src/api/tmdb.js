import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY || '8265bd1679663a7ea12ac168da84d2e8';
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';
export const BACKDROP_SIZE = '/original';
export const POSTER_SIZE = '/w500';
export const SMALL_POSTER_SIZE = '/w185';

const tmdbClient = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
  timeout: 10000,
});

// Image URL helpers
export const getBackdropUrl = (path) =>
  path ? `${IMAGE_BASE_URL}${BACKDROP_SIZE}${path}` : null;

export const getPosterUrl = (path) =>
  path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${path}` : null;

export const getSmallPosterUrl = (path) =>
  path ? `${IMAGE_BASE_URL}${SMALL_POSTER_SIZE}${path}` : null;

// Fetch helpers
export const fetchTrending = (mediaType = 'all', timeWindow = 'week') =>
  tmdbClient.get(`/trending/${mediaType}/${timeWindow}`).then((r) => r.data);

export const fetchPopularMovies = (page = 1) =>
  tmdbClient.get('/movie/popular', { params: { page } }).then((r) => r.data);

export const fetchTopRated = (page = 1) =>
  tmdbClient.get('/movie/top_rated', { params: { page } }).then((r) => r.data);

export const fetchUpcoming = (page = 1) =>
  tmdbClient.get('/movie/upcoming', { params: { page } }).then((r) => r.data);

export const fetchNowPlaying = (page = 1) =>
  tmdbClient.get('/movie/now_playing', { params: { page } }).then((r) => r.data);

export const fetchByGenre = (genreId, page = 1) =>
  tmdbClient
    .get('/discover/movie', { params: { with_genres: genreId, sort_by: 'popularity.desc', page } })
    .then((r) => r.data);

export const fetchTVPopular = (page = 1) =>
  tmdbClient.get('/tv/popular', { params: { page } }).then((r) => r.data);

export const fetchTVTopRated = (page = 1) =>
  tmdbClient.get('/tv/top_rated', { params: { page } }).then((r) => r.data);

export const fetchTVAiringToday = (page = 1) =>
  tmdbClient.get('/tv/airing_today', { params: { page } }).then((r) => r.data);

export const fetchMovieDetails = (movieId) =>
  tmdbClient.get(`/movie/${movieId}`).then((r) => r.data);

export const fetchMovieVideos = (movieId) =>
  tmdbClient.get(`/movie/${movieId}/videos`).then((r) => r.data);

export const searchMovies = (query, page = 1) =>
  tmdbClient
    .get('/search/multi', { params: { query, include_adult: false, page } })
    .then((r) => r.data);

export const fetchGenres = () =>
  tmdbClient.get('/genre/movie/list').then((r) => r.data);

// Genre IDs
export const GENRE_IDS = {
  ACTION: 28,
  COMEDY: 35,
  HORROR: 27,
  ROMANCE: 10749,
  ANIMATION: 16,
  DOCUMENTARY: 99,
  THRILLER: 53,
  SCIFI: 878,
  DRAMA: 18,
};

export default tmdbClient;
