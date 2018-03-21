import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { handleResponse } from '../../helpers.js';
import Loading from '../common/Loading';
import { API_URL } from '../../config';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      searchResults: [],
      searchQuery: '',
      loading: false,
    }

    this.handleRedirect = this.handleRedirect.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const searchQuery = e.target.value;

    this.setState({ searchQuery });

    // If searchQuery isn't present, don't send request to server
    if (!searchQuery) {
      return false;
    }

    // Set loading to true, while we are fetching data from server
    this.setState({ loading: true });

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then((result) => {
        this.setState({
          searchResults: result,
          loading: false,
        });
      });
  }

  handleRedirect(currencyId) {
    // Clear input value and close autocomplete container,
    // by clearing searchQuery state
    this.setState({
      searchQuery: '',
      searchResults: [],
    });

    // Redirect to currency page
    this.props.history.push(`/currency/${currencyId}`);
  }

  renderSearchResults() {
    const { searchResults, searchQuery, loading } = this.state;

    if (!searchQuery) {
      return '';
    }
    
    if (searchResults.length > 0) {
      return (
        <div className="Search-result-container">
          {searchResults.map(result =>
            <div
              key={result.id}
              className="Search-result"
              onClick={() => this.handleRedirect(result.id)}
            >
              {result.name} ({result.symbol})
            </div>
          )}
        </div>
      )
    }

    // Send no result, only if loading is set to false
    // To avoid showing no result, when actually there are ones
    if (!loading) {
      return (
        <div className="Search-result-container">
          <div className="Search-no-result">
            No results found.
          </div>
        </div>
      )
    }
  }

  render() {
    const { searchQuery, loading } = this.state;

    return (
      <div className='Search'>
        <div>
          <span className="Search-icon" />
          <input 
            onChange={this.handleChange}
            type="text"
            className="Search-input"
            placeholder="Currency name"
            value={searchQuery}
          />

          {loading &&
            <div className="Search-loading">
              <Loading
                width="12px"
                height="12px"
              />
            </div>}
        </div>

        {this.renderSearchResults()}
      </div>
    );
  }
}

Search.propTypes = {
  history: PropTypes.object.isRequired,
}

export default withRouter(Search);
