import React, { useEffect } from 'react';
import { Movie } from '../../types';
import { TMDB_IMAGE_BASE_URL } from '../../api/tmdbApi';
import {
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  MovieDetailBackdrop,
  MovieDetailContent,
  MovieDetailPoster,
  MovieDetailTitle,
  MovieDetailMeta,
  MovieDetailDescription,
  MovieGenres,
  GenreTag
} from '../../styles/StyledComponents';

interface MovieDetailProps {
  movie: Movie | null;
  genres: { id: number; name: string }[];
  onClose: () => void;
  visible: boolean;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie, genres, onClose, visible }) => {
  useEffect(() => {
    if (visible && movie) {
      const scrollY = window.scrollY;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [visible, movie]);

  if (!movie) return null;

  const releaseDate = movie.release_date 
    ? new Date(movie.release_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : 'Unknown';

  const movieGenres = movie.genre_ids
    .map(id => genres.find(genre => genre.id === id))
    .filter(genre => genre !== undefined)
    .map(genre => genre as { id: number; name: string });

  return (
    <ModalOverlay visible={visible} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalCloseButton onClick={onClose}>✕</ModalCloseButton>
        
        <MovieDetailBackdrop 
          imageUrl={movie.backdrop_path ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}` : undefined}
        />
        
        <MovieDetailContent>
          <MovieDetailPoster 
            imageUrl={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : undefined}
          />
          
          <MovieDetailTitle>{movie.title}</MovieDetailTitle>
          
          <MovieDetailMeta>
            <span>Released: {releaseDate}</span>
            <span>Rating: {movie.vote_average.toFixed(1)}/10</span>
            <span>Votes: {movie.vote_count.toLocaleString()}</span>
            <span>Language: {movie.original_language.toUpperCase()}</span>
          </MovieDetailMeta>
          
          <MovieDetailDescription>
            {movie.overview || 'No overview available for this movie.'}
          </MovieDetailDescription>
          
          <MovieGenres>
            {movieGenres.map(genre => (
              <GenreTag key={genre.id}>{genre.name}</GenreTag>
            ))}
          </MovieGenres>
        </MovieDetailContent>
      </ModalContent>
    </ModalOverlay>
  );
};

export default MovieDetail;
