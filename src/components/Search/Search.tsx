import React, { useState, useEffect, useRef } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import { TMDB_IMAGE_BASE_URL } from '../../api/tmdbApi';
import { Movie } from '../../types';
import {
  SearchSection,
  SearchContainer,
  SearchInput,
  AutocompleteDropdown,
  AutocompleteItem,
  AutocompletePoster,
  AutocompleteInfo
} from '../../styles/StyledComponents';
import AdvancedFilters from '../Filters/AdvancedFilters';
import { useDebounce } from '../../hooks/useDebounce';

const Search: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    searchMovies,
    suggestions,
    getSuggestions,
    loading: loadingSearch,
    loadingSuggestions
  } = useMovieContext();

  const [inputValue, setInputValue] = useState(searchQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearchTerm = useDebounce<string>(inputValue, 500);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchContainerRef]);

  useEffect(() => {
    setShowSuggestions(false);
  }, [searchQuery]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      getSuggestions(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, getSuggestions]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.trim()) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    if (inputValue.trim() && suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleSearch = (query: string = inputValue) => {
    if (query.trim()) {
      setSearchQuery(query);
      searchMovies(query);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (movie: Movie) => {
    setInputValue(movie.title);
    handleSearch(movie.title);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
  };

  return (
    <SearchSection>
      <SearchContainer ref={searchContainerRef}>
        <SearchInput
          type="text"
          placeholder="Search for movies..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          onFocus={handleInputFocus}
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <AutocompleteDropdown visible={true}>
            {suggestions.map(movie => (
              <AutocompleteItem 
                key={movie.id} 
                onClick={() => handleSuggestionClick(movie)}
              >
                <AutocompletePoster 
                  imageUrl={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : undefined} 
                />
                <AutocompleteInfo>
                  <h4>{movie.title}</h4>
                  <p>{movie.release_date ? movie.release_date.substring(0, 4) : 'Unknown'}</p>
                </AutocompleteInfo>
              </AutocompleteItem>
            ))}
          </AutocompleteDropdown>
        )}
      </SearchContainer>
      
      <AdvancedFilters />
    </SearchSection>
  );
};

export default Search;
