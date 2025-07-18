import React, { useState } from 'react';
import { useMovieContext } from '../../context/MovieContext';
import MovieCard from '../MovieCard/MovieCard';
import MovieDetail from '../MovieCard/MovieDetail';
import { Movie } from '../../types';
import {
  ResultsSection,
  ResultsHeader,
  ResultsTitle,
  ResultsCount,
  MoviesGrid,
  ProgressBar,
  ProgressBarFill,
  Loading,
  LoadingSpinner,
  SkeletonGrid,
  SkeletonCard,
  SkeletonPoster,
  SkeletonInfo,
  SkeletonLine,
  EmptyState,
  PaginationContainer,
  PaginationButton
} from '../../styles/StyledComponents';

const Results: React.FC = () => {
  const {
    movies,
    loading,
    error,
    totalResults,
    totalPages,
    currentPage,
    setCurrentPage,
    genres,
    searchQuery
  } = useMovieContext();

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleMovieClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const buttons = [];
    const maxButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    buttons.push(
      <PaginationButton 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo;
      </PaginationButton>
    );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <PaginationButton 
          key={i} 
          active={i === currentPage}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </PaginationButton>
      );
    }

    buttons.push(
      <PaginationButton 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &raquo;
      </PaginationButton>
    );

    return <PaginationContainer>{buttons}</PaginationContainer>;
  };

  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <SkeletonCard key={index}>
        <SkeletonPoster />
        <SkeletonInfo>
          <SkeletonLine width="80%" />
          <SkeletonLine width="30%" height="16px" />
          <SkeletonLine width="100%" height="16px" />
          <SkeletonLine width="90%" height="16px" />
          <SkeletonLine width="60%" height="16px" />
        </SkeletonInfo>
      </SkeletonCard>
    ));
  };

  return (
    <ResultsSection>
      <ProgressBar visible={loading}>
        <ProgressBarFill />
      </ProgressBar>

      <ResultsHeader>
        <ResultsTitle>Search Results</ResultsTitle>
        <ResultsCount>
          {totalResults > 0 ? `${totalResults} movies found` : '0 movies found'}
        </ResultsCount>
      </ResultsHeader>

      <Loading visible={loading && !movies.length}>
        <LoadingSpinner />
        <p>Searching for movies...</p>
      </Loading>

      {loading && !movies.length && (
        <SkeletonGrid visible={true}>
          {renderSkeletons()}
        </SkeletonGrid>
      )}

      {!loading && movies.length > 0 && (
        <>
          <MoviesGrid>
            {movies.map(movie => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                genres={genres}
                onClick={handleMovieClick}
              />
            ))}
          </MoviesGrid>
          {renderPagination()}
        </>
      )}

      <EmptyState visible={!loading && movies.length === 0 && searchQuery.trim() !== ''}>
        <h3>No movies found</h3>
        <p>Try searching with different keywords or check your spelling.</p>
      </EmptyState>

      <EmptyState visible={!!error}>
        <h3>Error</h3>
        <p>{error}</p>
      </EmptyState>

      <MovieDetail 
        movie={selectedMovie} 
        genres={genres}
        onClose={closeModal}
        visible={modalVisible}
      />
    </ResultsSection>
  );
};

export default Results;
