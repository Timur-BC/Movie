import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MovieList from '../components/MovieList';
import { selectFavorites, clearFavorites } from '../redux/favoritesSlice';

const FavoritesPage = () => {
  const favorites = useSelector(selectFavorites);
  const dispatch = useDispatch();
  
  const [confirmClear, setConfirmClear] = useState(false);
  
  // Обработчик очистки избранного
  const handleClearFavorites = () => {
    if (confirmClear) {
      dispatch(clearFavorites());
      setConfirmClear(false);
    } else {
      setConfirmClear(true);
    }
  };
  
  // Отмена очистки
  const handleCancelClear = () => {
    setConfirmClear(false);
  };
  
  return (
    <div className="favorites-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Избранные фильмы</h1>
          
          {favorites.length > 0 && (
            <div className="favorites-actions">
              {confirmClear ? (
                <>
                  <div className="confirm-message">
                    Вы уверены, что хотите очистить все избранное?
                  </div>
                  <div className="confirm-actions">
                    <button 
                      className="confirm-button"
                      onClick={handleClearFavorites}
                    >
                      Да, очистить
                    </button>
                    <button 
                      className="cancel-button"
                      onClick={handleCancelClear}
                    >
                      Отмена
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  className="clear-button"
                  onClick={handleClearFavorites}
                >
                  Очистить избранное
                </button>
              )}
            </div>
          )}
        </div>
        
        <div className="favorites-content">
          {favorites.length === 0 ? (
            <div className="no-favorites">
              <p>У вас пока нет избранных фильмов.</p>
              <p>Добавьте фильмы в избранное, чтобы они отображались здесь.</p>
            </div>
          ) : (
            <MovieList 
              movies={favorites} 
              loading={false} 
              error={null} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FavoritesPage;