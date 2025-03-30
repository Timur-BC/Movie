import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, loading, error }) => {
  if (loading) {
    return <div className="loading-spinner">Загрузка фильмов...</div>;
  }

  if (error) {
    return <div className="error-message">Ошибка: {error}</div>;
  }

  if (!movies || movies.length === 0) {
    return <div className="no-results">Фильмы не найдены</div>;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;