import axios from 'axios';

// Базовая конфигурация для axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_APP_TMDB_API_KEY,
    language: 'ru-RU',
  },
});

// Получение списка популярных фильмов
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await apiClient.get('/movie/popular', {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при получении популярных фильмов:', error);
    throw error;
  }
};

// Получение детальной информации о фильме
export const getMovieDetails = async (movieId) => {
  try {
    const response = await apiClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: 'credits,videos,recommendations',
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Ошибка при получении информации о фильме ${movieId}:`, error);
    throw error;
  }
};

// Получение списка жанров
export const getGenres = async () => {
  try {
    const response = await apiClient.get('/genre/movie/list');
    return response.data.genres;
  } catch (error) {
    console.error('Ошибка при получении списка жанров:', error);
    throw error;
  }
};

// Поиск фильмов с фильтрами
export const discoverMovies = async (filters = {}, page = 1) => {
    try {
      const { genres, startDate, endDate, minRating, sortBy } = filters;
      
      const params = {
        page,
        sort_by: sortBy || 'popularity.desc',
      };
      
      // Добавляем параметры только если они были переданы
      if (genres && genres.length > 0) {
        params.with_genres = genres.join(',');
      }
      
      if (startDate) {
        params['primary_release_date.gte'] = startDate;
      }
      
      if (endDate) {
        params['primary_release_date.lte'] = endDate;
      }
      
      if (minRating) {
        params['vote_average.gte'] = minRating;
      }
      
      const response = await apiClient.get('/discover/movie', { params });
      return response.data;
    } catch (error) {
      console.error('Ошибка при поиске фильмов:', error);
      throw error;
    }
  };

// Функция для формирования URL изображения
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return null;
  return `${import.meta.env.VITE_APP_IMAGE_BASE_URL}/${size}${path}`;
};