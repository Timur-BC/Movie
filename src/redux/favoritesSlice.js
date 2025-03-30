import { createSlice } from '@reduxjs/toolkit';

// Попытка загрузить избранные фильмы из localStorage
const loadFavoritesFromStorage = () => {
  try {
    const serializedFavorites = localStorage.getItem('favorites');
    if (serializedFavorites === null) {
      return [];
    }
    return JSON.parse(serializedFavorites);
  } catch (err) {
    console.error('Ошибка при загрузке избранного из localStorage:', err);
    return [];
  }
};

// Сохранение избранных фильмов в localStorage
const saveFavoritesToStorage = (favorites) => {
  try {
    const serializedFavorites = JSON.stringify(favorites);
    localStorage.setItem('favorites', serializedFavorites);
  } catch (err) {
    console.error('Ошибка при сохранении избранного в localStorage:', err);
  }
};

// Создание slice для управления избранными фильмами
const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    movies: loadFavoritesFromStorage(),
  },
  reducers: {
    addToFavorites: (state, action) => {
      // Проверяем, есть ли уже этот фильм в избранном
      if (!state.movies.some(movie => movie.id === action.payload.id)) {
        state.movies.push(action.payload);
        saveFavoritesToStorage(state.movies);
      }
    },
    removeFromFavorites: (state, action) => {
      state.movies = state.movies.filter(movie => movie.id !== action.payload);
      saveFavoritesToStorage(state.movies);
    },
    clearFavorites: (state) => {
      state.movies = [];
      saveFavoritesToStorage(state.movies);
    },
  },
});

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoritesSlice.actions;

// Селектор для получения всех избранных фильмов
export const selectFavorites = (state) => state.favorites.movies;

// Селектор для проверки, находится ли фильм в избранном
export const selectIsFavorite = (state, movieId) => 
  state.favorites.movies.some(movie => movie.id === movieId);

export default favoritesSlice.reducer;