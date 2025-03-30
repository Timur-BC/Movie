// Размеры изображений TMDB
export const IMAGE_SIZES = {
    POSTER: {
      SMALL: 'w185',
      MEDIUM: 'w342',
      LARGE: 'w500',
      ORIGINAL: 'original',
    },
    BACKDROP: {
      SMALL: 'w300',
      MEDIUM: 'w780',
      LARGE: 'w1280',
      ORIGINAL: 'original',
    },
    PROFILE: {
      SMALL: 'w45',
      MEDIUM: 'w185',
      LARGE: 'h632',
      ORIGINAL: 'original',
    },
  };
  
  // Опции сортировки
  export const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Популярные по убыванию' },
    { value: 'popularity.asc', label: 'Популярные по возрастанию' },
    { value: 'vote_average.desc', label: 'Рейтинг по убыванию' },
    { value: 'vote_average.asc', label: 'Рейтинг по возрастанию' },
    { value: 'primary_release_date.desc', label: 'Дата выхода по убыванию' },
    { value: 'primary_release_date.asc', label: 'Дата выхода по возрастанию' },
    { value: 'title.asc', label: 'Название (А-Я)' },
    { value: 'title.desc', label: 'Название (Я-А)' },
  ];
  
  // Диапазоны рейтингов и соответствующие цвета
  export const RATING_COLORS = {
    LOW: '#db2360',    // Низкий рейтинг (0-4.9)
    MEDIUM: '#d2d531', // Средний рейтинг (5.0-6.9)
    HIGH: '#21d07a',   // Высокий рейтинг (7.0-10)
  };
  
  // Функция для определения цвета на основе рейтинга
  export const getRatingColor = (rating) => {
    if (rating >= 7) return RATING_COLORS.HIGH;
    if (rating >= 5) return RATING_COLORS.MEDIUM;
    return RATING_COLORS.LOW;
  };