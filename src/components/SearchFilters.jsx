import React, { useState, useEffect } from 'react';
import { getGenres } from '../api/tmdbApi';

const SearchFilters = ({ onFilterChange }) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [minRating, setMinRating] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtersActive, setFiltersActive] = useState(false);

  // Загрузка жанров при монтировании компонента
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setIsLoading(true);
        const genresList = await getGenres();
        setGenres(genresList);
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке жанров');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGenres();
  }, []);

  // Обработчик изменения жанров
  const handleGenreChange = (genreId) => {
    setSelectedGenres(prevSelected => {
      // Если жанр уже выбран, удаляем его, иначе добавляем
      if (prevSelected.includes(genreId)) {
        return prevSelected.filter(id => id !== genreId);
      } else {
        return [...prevSelected, genreId];
      }
    });
    setFiltersActive(true);
  };

  // Обработчик изменения даты начала
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setFiltersActive(true);
  };

  // Обработчик изменения даты окончания
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setFiltersActive(true);
  };

  // Обработчик изменения минимального рейтинга
  const handleRatingChange = (e) => {
    setMinRating(e.target.value);
    setFiltersActive(true);
  };

  // Применение фильтров
  const applyFilters = () => {
    // Преобразуем строки в числа там, где это необходимо
    const filterData = {
      genres: selectedGenres,
      startDate: startDate || null,
      endDate: endDate || null,
      minRating: minRating ? parseFloat(minRating) : null,
    };
    
    console.log('Применяемые фильтры:', filterData); // Для отладки
    onFilterChange(filterData);
  };

  // Сброс фильтров
  const resetFilters = () => {
    setSelectedGenres([]);
    setStartDate('');
    setEndDate('');
    setMinRating('');
    setFiltersActive(false);
    
    onFilterChange({
      genres: [],
      startDate: null,
      endDate: null,
      minRating: null,
    });
  };

  return (
    <div className="search-filters">
      <h3 className="filters-title">Фильтры</h3>
      
      <div className="filter-group">
        <label className="filter-label">Жанры:</label>
        {isLoading ? (
          <div className="loading-text">Загрузка жанров...</div>
        ) : error ? (
          <div className="error-text">{error}</div>
        ) : (
          <div className="genres-list">
            {genres.map((genre) => (
              <label key={genre.id} className="genre-checkbox">
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                />
                {genre.name}
              </label>
            ))}
          </div>
        )}
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Дата выхода:</label>
        <div className="date-range">
          <input
            type="date"
            className="date-input"
            value={startDate}
            onChange={handleStartDateChange}
            placeholder="От"
          />
          <span className="date-separator">—</span>
          <input
            type="date"
            className="date-input"
            value={endDate}
            onChange={handleEndDateChange}
            placeholder="До"
          />
        </div>
      </div>
      
      <div className="filter-group">
        <label className="filter-label">Минимальный рейтинг: <span className="rating-value">{minRating || 0}</span></label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.5"
          value={minRating}
          onChange={handleRatingChange}
          className="rating-slider"
        />
      </div>
      
      <div className="filter-actions">
        <button 
          className={`apply-button ${filtersActive ? 'active' : ''}`} 
          onClick={applyFilters}
        >
          Применить фильтры
        </button>
        <button className="reset-button" onClick={resetFilters}>
          Сбросить
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;