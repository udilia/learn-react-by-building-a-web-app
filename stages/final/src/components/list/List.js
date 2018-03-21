import React from 'react';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers.js';
import Pagination from './Pagination';
import Loading from '../common/Loading';
import Table from './Table';

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      page: 1,
      totalPages: 0,
      // NOTE: Don't set it greater than 50, because maximum perPage for API is 50
      perPage: 20,
      currencies: [],
      loading: false,
      error: '',
    };

    this.handlePaginationClick = this.handlePaginationClick.bind(this);
  }

  componentWillMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    const { page, perPage } = this.state;

    // Set loading to true, while we are fetching data from server
    this.setState({ loading: true });

    // Fetch crypto currency data from API with page and perPage parameters
    fetch(`${API_URL}/cryptocurrencies/?page=${page}&perPage=${perPage}`)
      .then(handleResponse)
      .then((data) => {
        // Set received data in components state
        // Clear error if any and set loading to false
        const { totalPages, currencies } = data;

        this.setState({
          currencies,
          totalPages,
          error: '',
          loading: false,
        });
      })
      .catch((error) => {
        // Show error message, if request fails and set loading to false
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  handlePaginationClick(direction) {
    let nextPage = this.state.page;

    // Increment nextPage if direction variable is next, otherwise decrement it
    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

    // Call fetchCurrencies function inside setState's callback
    // Because we have to make sure first page state is updated
    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
  }

  render() {
    const { currencies, loading, error, page, totalPages } = this.state;

    // Render only loading component, if it's set to true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    // Render only error message, if error occured while fetching data
    if (error) {
      return <div className="error">{error}</div>
    }

    return (
      <div>
        <Table currencies={currencies} />

        <Pagination
          page={page}
          totalPages={totalPages}
          handlePaginationClick={this.handlePaginationClick}
        />
      </div>
    );
  }
}

export default List;
