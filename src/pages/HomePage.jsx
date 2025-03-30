import React, { useState, useEffect } from 'react';
import MovieList from '../components/MovieList';
import SearchFilters from '../components/SearchFilters';
import Pagination from '../components/Pagination';
import { getPopularMovies, discoverMovies } from '../api/tmdbApi';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activeFilters, setActiveFilters] = useState(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

  // Загрузка фильмов при монтировании компонента или при изменении страницы/фильтров
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        let data;
        
        // Если фильтры активны, используем discover API
        if (activeFilters) {
          data = await discoverMovies(activeFilters, currentPage);
        } else {
          // Иначе получаем популярные фильмы
          data = await getPopularMovies(currentPage);
        }
        
        setMovies(data.results);
        setTotalPages(data.total_pages > 500 ? 500 : data.total_pages); // TMDB API ограничивает 500 страницами
        setError(null);
      } catch (err) {
        setError('Ошибка при загрузке фильмов');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [currentPage, activeFilters]);
  
  // Обработчик изменения страницы
  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Прокрутка вверх страницы
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Обработчик изменения фильтров
  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    setCurrentPage(1); // Сбрасываем на первую страницу при применении новых фильтров
  };
  
  // Переключение панели фильтров (для мобильных устройств)
  const toggleFilterPanel = () => {
    setIsFilterPanelOpen(!isFilterPanelOpen);
  };
  
  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Фильмы</h1>
          <button 
            className="filter-toggle-button"
            onClick={toggleFilterPanel}
          >
            {isFilterPanelOpen ? 'Скрыть фильтры' : 'Показать фильтры'}
          </button>
        </div>
        
        <div className="content-wrapper">
          <aside className={`filters-panel ${isFilterPanelOpen ? 'is-open' : ''}`}>
            <SearchFilters onFilterChange={handleFilterChange} />
          </aside>
          
          <div className="main-content">
            <MovieList 
              movies={movies} 
              loading={loading} 
              error={error} 
            />
            
            {!loading && !error && movies.length > 0 && (
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
                onPageChange={handlePageChange} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;