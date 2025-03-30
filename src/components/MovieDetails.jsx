import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails, getImageUrl } from '../api/tmdbApi';
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../redux/favoritesSlice';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const isFavorite = useSelector(state => selectIsFavorite(state, parseInt(id)));
  
  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке информации о фильме');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovieDetails();
  }, [id]);
  
  const handleFavoriteToggle = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(parseInt(id)));
    } else if (movie) {
      // Сохраняем только необходимые данные для карточки фильма
      const movieForFavorites = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
        release_date: movie.release_date
      };
      dispatch(addToFavorites(movieForFavorites));
    }
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  if (loading) {
    return <div className="loading-spinner">Загрузка информации о фильме...</div>;
  }
  
  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button className="back-button" onClick={handleGoBack}>
          Вернуться назад
        </button>
      </div>
    );
  }
  
  if (!movie) {
    return (
      <div className="not-found-container">
        <div className="not-found-message">Фильм не найден</div>
        <button className="back-button" onClick={handleGoBack}>
          Вернуться назад
        </button>
      </div>
    );
  }
  
  // Форматирование даты выхода
  const formatReleaseDate = (dateString) => {
    if (!dateString) return 'Нет данных';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };
  
  // Форматирование бюджета и сборов
  const formatMoney = (value) => {
    if (!value) return 'Нет данных';
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Форматирование продолжительности
  const formatRuntime = (minutes) => {
    if (!minutes) return 'Нет данных';
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (hours === 0) {
      return `${remainingMinutes} мин.`;
    }
    
    return `${hours} ч. ${remainingMinutes} мин.`;
  };
  
  return (
    <div className="movie-details">
      <button className="back-button" onClick={handleGoBack}>
        &laquo; Назад
      </button>
      
      <div className="movie-header">
        <div className="movie-poster-container">
          {movie.poster_path ? (
            <img 
              src={getImageUrl(movie.poster_path, 'w500')} 
              alt={movie.title} 
              className="movie-poster-large"
            />
          ) : (
            <div className="movie-poster-placeholder-large">
              Нет изображения
            </div>
          )}
        </div>
        
        <div className="movie-info">
          <h1 className="movie-title-large">
            {movie.title} 
            {movie.release_date && (
              <span className="movie-year">
                ({new Date(movie.release_date).getFullYear()})
              </span>
            )}
          </h1>
          
          {movie.tagline && (
            <p className="movie-tagline">«{movie.tagline}»</p>
          )}
          
          <div className="movie-rating-large">
            <span className="rating-value">{movie.vote_average.toFixed(1)}</span>
            <span className="rating-count">({movie.vote_count} голосов)</span>
          </div>
          
          <div className="movie-meta">
            <div className="meta-item">
              <span className="meta-label">Статус:</span>
              <span className="meta-value">{movie.status === 'Released' ? 'Выпущен' : movie.status}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">Дата выхода:</span>
              <span className="meta-value">{formatReleaseDate(movie.release_date)}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">Продолжительность:</span>
              <span className="meta-value">{formatRuntime(movie.runtime)}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">Бюджет:</span>
              <span className="meta-value">{formatMoney(movie.budget)}</span>
            </div>
            
            <div className="meta-item">
              <span className="meta-label">Сборы:</span>
              <span className="meta-value">{formatMoney(movie.revenue)}</span>
            </div>
          </div>
          
          <div className="genres">
            {movie.genres && movie.genres.map(genre => (
              <span key={genre.id} className="genre-tag">
                {genre.name}
              </span>
            ))}
          </div>
          
          <button 
            className={`favorite-button-large ${isFavorite ? 'is-favorite' : ''}`}
            onClick={handleFavoriteToggle}
          >
            {isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
          </button>
        </div>
      </div>
      
      <div className="movie-content">
        {movie.overview && (
          <div className="movie-section">
            <h2 className="section-title">Описание</h2>
            <p className="movie-overview">{movie.overview}</p>
          </div>
        )}
        
        {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
          <div className="movie-section">
            <h2 className="section-title">В ролях</h2>
            <div className="cast-list">
              {movie.credits.cast.slice(0, 10).map(person => (
                <div key={person.id} className="cast-item">
                  {person.profile_path ? (
                    <img 
                      src={getImageUrl(person.profile_path, 'w185')} 
                      alt={person.name}
                      className="cast-photo" 
                    />
                  ) : (
                    <div className="cast-photo-placeholder">
                      Нет фото
                    </div>
                  )}
                  <div className="cast-details">
                    <div className="cast-name">{person.name}</div>
                    <div className="cast-character">{person.character}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {movie.videos && movie.videos.results && movie.videos.results.length > 0 && (
          <div className="movie-section">
            <h2 className="section-title">Трейлеры</h2>
            <div className="video-list">
              {movie.videos.results
                .filter(video => video.type === 'Trailer' && video.site === 'YouTube')
                .slice(0, 3)
                .map(video => (
                  <div key={video.id} className="video-item">
                    <iframe
                      title={video.name}
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${video.key}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <div className="video-name">{video.name}</div>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {movie.recommendations && movie.recommendations.results && movie.recommendations.results.length > 0 && (
          <div className="movie-section">
            <h2 className="section-title">Рекомендуемые фильмы</h2>
            <div className="recommended-list">
              {movie.recommendations.results.slice(0, 6).map(rec => (
                <div 
                  key={rec.id} 
                  className="recommended-item"
                  onClick={() => navigate(`/movie/${rec.id}`)}
                >
                  {rec.poster_path ? (
                    <img 
                      src={getImageUrl(rec.poster_path, 'w185')} 
                      alt={rec.title}
                      className="recommended-poster" 
                    />
                  ) : (
                    <div className="recommended-poster-placeholder">
                      Нет изображения
                    </div>
                  )}
                  <div className="recommended-title">{rec.title}</div>
                  <div className="recommended-rating">{rec.vote_average.toFixed(1)}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;