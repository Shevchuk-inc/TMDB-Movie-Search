import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MovieCard from './MovieCard';
import { Movie, Genre } from '../../types';

const mockMovie: Movie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-poster.jpg',
  backdrop_path: '/test-backdrop.jpg',
  overview: 'This is a test movie overview',
  release_date: '2024-01-01',
  vote_average: 8.5,
  genre_ids: [28, 12, 878],
  original_language: 'en',
  popularity: 100,
  vote_count: 1000,
  adult: false
};

const mockGenres: Genre[] = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 878, name: 'Science Fiction' },
  { id: 35, name: 'Comedy' }
];

jest.mock('../../api/tmdbApi', () => ({
  TMDB_IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/w500'
}));

describe('MovieCard Component', () => {
  const mockOnClick = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders movie card with correct information', () => {
    render(
      <MovieCard 
        movie={mockMovie} 
        genres={mockGenres} 
        onClick={mockOnClick} 
      />
    );

    expect(screen.getByText('Test Movie')).toBeInTheDocument();

    expect(screen.getByText('2024')).toBeInTheDocument();

    expect(screen.getByText('This is a test movie overview')).toBeInTheDocument();

    expect(screen.getByText('8.5')).toBeInTheDocument();

    expect(screen.getByText('Action')).toBeInTheDocument();
    expect(screen.getByText('Adventure')).toBeInTheDocument();
    expect(screen.getByText('Science Fiction')).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    render(
      <MovieCard 
        movie={mockMovie} 
        genres={mockGenres} 
        onClick={mockOnClick} 
      />
    );

    fireEvent.click(screen.getByText('Test Movie'));

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(mockMovie);
  });

  test('handles missing data gracefully', () => {
    const incompleteMovie: Movie = {
      ...mockMovie,
      poster_path: null,
      release_date: '',
      overview: ''
    };

    render(
      <MovieCard 
        movie={incompleteMovie} 
        genres={mockGenres} 
        onClick={mockOnClick} 
      />
    );
    
    // Check if fallback values are used
    expect(screen.getByText('N/A')).toBeInTheDocument();
    expect(screen.getByText('No overview available.')).toBeInTheDocument();
  });
});
