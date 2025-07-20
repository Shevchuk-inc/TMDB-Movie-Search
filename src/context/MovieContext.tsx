import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import tmdbApi from '../api/tmdbApi';
import { Movie, MovieSearchResponse, SearchFilters, Genre, SearchHistoryItem } from '../types';

const defaultFilters: SearchFilters = {
  language: 'en-US',
  page: 1,
  include_adult: false,
};

interface MovieContextType {
  movies: Movie[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: SearchFilters;
  updateFilters: (newFilters: Partial<SearchFilters>) => void;
  searchMovies: (query?: string) => Promise<void>;
  totalResults: number;
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  genres: Genre[];
  suggestions: Movie[];
  loadingSuggestions: boolean;
  getSuggestions: (query: string) => Promise<void>;
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  searchHistory: SearchHistoryItem[];
  addToSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
}

const MovieContext = createContext<MovieContextType>({
  movies: [],
  loading: false,
  error: null,
  searchQuery: '',
  setSearchQuery: () => {},
  filters: defaultFilters,
  updateFilters: () => {},
  searchMovies: async () => {},
  totalResults: 0,
  totalPages: 0,
  currentPage: 1,
  setCurrentPage: () => {},
  genres: [],
  suggestions: [],
  loadingSuggestions: false,
  getSuggestions: async () => {},
  selectedMovie: null,
  setSelectedMovie: () => {},
  searchHistory: [],
  addToSearchHistory: () => {},
  clearSearchHistory: () => {},
});

export const MovieProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const genresData = await tmdbApi.getGenres();
        setGenres(genresData);
      } catch (err) {
        console.error('Failed to load genres:', err);
      }
    };

    loadGenres();
  }, []);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  useEffect(() => {
    if (searchQuery && currentPage > 0) {
      searchMovies().catch(error => {
        console.error('Error searching movies:', error);
      });
    }
  }, [currentPage]);

  const updateFilters = (newFilters: Partial<SearchFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const searchMovies = async (query?: string) => {
    const searchTerm = query !== undefined ? query : searchQuery;
    
    if (!searchTerm.trim()) {
      setMovies([]);
      setTotalResults(0);
      setTotalPages(0);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const searchFilters = { ...filters, page: currentPage };
      const response: MovieSearchResponse = await tmdbApi.searchMovies({
        query: searchTerm,
        ...searchFilters,
      });

      setMovies(response.results);
      setTotalResults(response.total_results);
      setTotalPages(response.total_pages);

      if (currentPage === 1 && searchTerm) {
        addToSearchHistory(searchTerm);
      }
    } catch (err) {
      setError('Failed to search movies. Please try again.');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSuggestions = async (query: string) => {
    if (!query.trim() || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);

    try {
      const results = await tmdbApi.getMovieSuggestions(query);
      setSuggestions(results);
    } catch (err) {
      console.error('Failed to get suggestions:', err);
    } finally {
      setLoadingSuggestions(false);
    }
  };

  const addToSearchHistory = (query: string) => {
    if (!query.trim()) return;

    const newItem: SearchHistoryItem = {
      id: Date.now().toString(),
      query,
      timestamp: Date.now(),
      filters: { ...filters },
    };

    setSearchHistory(prev => [newItem, ...prev.slice(0, 9)]);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem('searchHistory');
  };

  const value = {
    movies,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    filters,
    updateFilters,
    searchMovies,
    totalResults,
    totalPages,
    currentPage,
    setCurrentPage,
    genres,
    suggestions,
    loadingSuggestions,
    getSuggestions,
    selectedMovie,
    setSelectedMovie,
    searchHistory,
    addToSearchHistory,
    clearSearchHistory,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovieContext = () => useContext(MovieContext);

export default MovieContext;
