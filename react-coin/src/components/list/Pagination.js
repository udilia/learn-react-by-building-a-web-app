import React from 'react';
import './Pagination.css';

const Pagination = ({ page, totalPages, handlePageChange }) => {
  return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        onClick={ () => handlePageChange('prev') }
        disabled={ page <= 1 }
      >
        &larr;
      </button>

      <span className="Pagination-info">
        Page <b>{page}</b> of <b>{totalPages}</b>
      </span>

      <button
        className="Pagination-button"
        onClick={ () => handlePageChange() }
        disabled={ page >= totalPages }
      >
        &rarr;
      </button>
    </div>
  )
}

export default Pagination;
