import axios from 'axios';

const TMDB_API_KEY = '9d60fd2bcec40a4a97961076be3cd784';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZDYwZmQyYm...';

const tmdbAxios = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${ACCESS_TOKEN}`
  }
});

export interface MovieSearchParams {
  query: string;
  language?: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
  year?: number;
  primary_release_year?: number;
}

const tmdbApi = {
  searchMovies: async (params: MovieSearchParams) => {
    try {
      const response = await tmdbAxios.get('/search/movie', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  getMovieDetails: async (movieId: number) => {
    try {
      const response = await tmdbAxios.get(`/movie/${movieId}`);
      return response.data;
    } catch (error) {
      console.error('Error getting movie details:', error);
      throw error;
    }
  },

  getMovieSuggestions: async (query: string) => {
    try {
      const response = await tmdbAxios.get('/search/movie', {
        params: {
          query,
          page: 1,
          include_adult: false,
        }
      });
      return response.data.results.slice(0, 5);
    } catch (error) {
      console.error('Error getting movie suggestions:', error);
      throw error;
    }
  },

  getGenres: async () => {
    try {
      const response = await tmdbAxios.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Error getting genres:', error);
      throw error;
    }
  }
};

export { TMDB_IMAGE_BASE_URL };
export default tmdbApi;
