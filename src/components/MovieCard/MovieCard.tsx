import React from 'react';
import { Movie, Genre } from '../../types';
import { TMDB_IMAGE_BASE_URL } from '../../api/tmdbApi';
import {
  MovieCard as MovieCardContainer,
  MoviePoster,
  MovieRating,
  MovieInfo,
  MovieTitle,
  MovieYear,
  MovieOverview,
  MovieGenres,
  GenreTag
} from '../../styles/StyledComponents';

interface MovieCardProps {
  movie: Movie;
  genres: Genre[];
  onClick: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, genres, onClick }) => {
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  const movieGenres = (movie.genre_ids || [])
    .map(id => genres.find(genre => genre.id === id))
    .filter(genre => genre !== undefined)
    .map(genre => genre as Genre);

  return (
    <MovieCardContainer onClick={() => onClick(movie)}>
      <MoviePoster imageUrl={movie.poster_path ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}` : undefined}>
        <MovieRating>{rating}</MovieRating>
      </MoviePoster>
      <MovieInfo>
        <MovieTitle>{movie.title}</MovieTitle>
        <MovieYear>{releaseYear}</MovieYear>
        <MovieOverview>{movie.overview || 'No overview available.'}</MovieOverview>
        <MovieGenres>
          {movieGenres.slice(0, 3).map(genre => (
            <GenreTag key={genre.id}>{genre.name}</GenreTag>
          ))}
        </MovieGenres>
      </MovieInfo>
    </MovieCardContainer>
  );
};

export default MovieCard;
