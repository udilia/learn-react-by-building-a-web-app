import React from 'react';
import PropTypes from 'prop-types';
import './Pagination.css';

const Pagination = (props) => {
  const { totalPages, page, handlePaginationClick } = props;

  return (
    <div className="Pagination">
      <button
        className="Pagination-button"
        disabled={page <= 1}
        onClick={() => handlePaginationClick('prev')}
      >
        &larr;
      </button>

      <span className="Pagination-info">
        Page <b>{page}</b> of <b>{totalPages}</b>
      </span>

      <button
        className="Pagination-button"
        disabled={page === totalPages}
        onClick={() => handlePaginationClick('next')}
      >
        &rarr;
      </button>
    </div>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  handlePaginationClick: PropTypes.func.isRequired,
};

export default Pagination;
