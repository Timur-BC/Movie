import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Максимальное количество кнопок страниц для отображения
  const maxPageButtons = 5;
  
  // Функция для создания массива отображаемых страниц
  const getPageNumbers = () => {
    // Если общее количество страниц меньше или равно максимальному количеству кнопок,
    // отображаем все страницы
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    // Базовый набор страниц: текущая страница и по две с каждой стороны
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + maxPageButtons - 1, totalPages);
    
    // Если мы достигли конца, сдвигаем начало, чтобы показать достаточное количество кнопок
    if (end === totalPages) {
      start = Math.max(end - maxPageButtons + 1, 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  
  const pageNumbers = getPageNumbers();
  
  return (
    <div className="pagination">
      <button
        className="pagination-button prev-button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &laquo; Назад
      </button>
      
      {pageNumbers[0] > 1 && (
        <>
          <button 
            className="pagination-button page-number" 
            onClick={() => onPageChange(1)}
          >
            1
          </button>
          {pageNumbers[0] > 2 && <span className="pagination-ellipsis">...</span>}
        </>
      )}
      
      {pageNumbers.map(number => (
        <button
          key={number}
          className={`pagination-button page-number ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      
      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="pagination-ellipsis">...</span>
          )}
          <button
            className="pagination-button page-number"
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}
      
      <button
        className="pagination-button next-button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Вперед &raquo;
      </button>
    </div>
  );
};

export default Pagination;