import React from 'react';
import Loading from '../common/Loading';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Table from './Table.js';
import Pagination from './Pagination';


class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1,
    }

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  fetchData() {
    this.setState({ loading: true })

    const { page } = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse)
      .then(({ currencies, totalPages }) => {
        this.setState({
          currencies,
          totalPages,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  componentDidMount() {
    this.fetchData();
  }

  handlePageChange(direction) {
    const { page } = this.state;

    if (direction === 'prev') {
      this.setState({ page: page - 1 }, this.fetchData);
    } else {
      this.setState({ page: page + 1 }, this.fetchData);
    }
  }

  render() {
   const { currencies, loading, error, page, totalPages } = this.state;

    if (loading) {
      return <div className='loading-container'><Loading /></div>
    }

    if (error) {
      return <div className='error'>{error}</div>
    }

    else {
      return (
        <div>
          <Table
            currencies={currencies}
          />

          <Pagination
            page={page}
            totalPages={totalPages}
            handlePageChange={this.handlePageChange}
          />
        </div>
      )
    }
  }
}

export default List;
