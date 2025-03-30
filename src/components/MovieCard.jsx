import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../redux/favoritesSlice';
import { getImageUrl } from '../api/tmdbApi';

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const isFavorite = useSelector(state => selectIsFavorite(state, movie.id));
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault(); // Предотвращаем переход на страницу фильма
    e.stopPropagation(); // Останавливаем всплытие события
    
    if (isFavorite) {
      dispatch(removeFromFavorites(movie.id));
    } else {
      dispatch(addToFavorites(movie));
    }
  };
  
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-card-image">
          {movie.poster_path ? (
            <img 
              src={getImageUrl(movie.poster_path, 'w342')} 
              alt={movie.title} 
              className="movie-poster"
            />
          ) : (
            <div className="movie-poster-placeholder">
              Нет изображения
            </div>
          )}
          <div className="movie-rating">
            {movie.vote_average.toFixed(1)}
          </div>
        </div>
        
        <div className="movie-card-content">
          <h3 className="movie-title">{movie.title}</h3>
          <p className="movie-release-date">
            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'Нет даты'}
          </p>
        </div>
      </Link>
      
      <button 
        className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
        onClick={handleFavoriteToggle}
        aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
      >
        {isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
};

export default MovieCard;