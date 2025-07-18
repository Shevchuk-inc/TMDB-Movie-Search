import React, { useState } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import {
  AdvancedFilters as AdvancedFiltersContainer,
  FiltersToggle,
  FiltersContent,
  FilterField,
  FilterLabel,
  FilterInput,
  FilterSelect,
  CheckboxField
} from '../../styles/StyledComponents';

const AdvancedFilters: React.FC = () => {
  const { filters, updateFilters, searchQuery, searchMovies } = useMovieContext();
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ language: e.target.value });
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    updateFilters({ year: value });
  };

  const handlePrimaryReleaseYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : undefined;
    updateFilters({ primary_release_year: value });
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilters({ region: e.target.value || undefined });
  };

  const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1;
    updateFilters({ page: value });
  };

  const handleAdultContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters({ include_adult: e.target.checked });
  };

  const applyFilters = () => {
    searchMovies(searchQuery);
  };

  return (
    <AdvancedFiltersContainer>
      <FiltersToggle onClick={toggleFilters}>
        {showFilters ? '🔼 Hide Advanced Options' : '🔽 Advanced Search Options'}
      </FiltersToggle>
      
      <FiltersContent visible={showFilters}>
        <FilterField>
          <FilterLabel>Language</FilterLabel>
          <FilterSelect 
            value={filters.language} 
            onChange={handleLanguageChange}
            onBlur={applyFilters}
          >
            <option value="en-US">English (US)</option>
            <option value="en-GB">English (UK)</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="de-DE">German</option>
            <option value="it-IT">Italian</option>
            <option value="ja-JP">Japanese</option>
            <option value="ko-KR">Korean</option>
            <option value="zh-CN">Chinese</option>
          </FilterSelect>
        </FilterField>

        <FilterField>
          <FilterLabel>Release Year</FilterLabel>
          <FilterInput 
            type="number" 
            placeholder="e.g. 2024"
            min="1900"
            max="2030"
            value={filters.primary_release_year || ''}
            onChange={handlePrimaryReleaseYearChange}
            onBlur={applyFilters}
          />
        </FilterField>

        <FilterField>
          <FilterLabel>Year</FilterLabel>
          <FilterInput 
            type="number" 
            placeholder="e.g. 2024"
            min="1900"
            max="2030"
            value={filters.year || ''}
            onChange={handleYearChange}
            onBlur={applyFilters}
          />
        </FilterField>

        <FilterField>
          <FilterLabel>Region</FilterLabel>
          <FilterSelect 
            value={filters.region || ''} 
            onChange={handleRegionChange}
            onBlur={applyFilters}
          >
            <option value="">All Regions</option>
            <option value="US">United States</option>
            <option value="GB">United Kingdom</option>
            <option value="CA">Canada</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="JP">Japan</option>
            <option value="KR">South Korea</option>
            <option value="IN">India</option>
          </FilterSelect>
        </FilterField>

        <FilterField>
          <FilterLabel>Page</FilterLabel>
          <FilterInput 
            type="number" 
            min="1"
            value={filters.page || 1}
            onChange={handlePageChange}
            onBlur={applyFilters}
          />
        </FilterField>

        <FilterField>
          <CheckboxField>
            <input 
              type="checkbox" 
              id="adult-content"
              checked={filters.include_adult || false}
              onChange={handleAdultContentChange}
              onBlur={applyFilters}
            />
            <label htmlFor="adult-content">Include Adult Content</label>
          </CheckboxField>
        </FilterField>
      </FiltersContent>
    </AdvancedFiltersContainer>
  );
};

export default AdvancedFilters;
