import React from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../../config';
import { handleResponse } from '../../helpers';
import Loading from './Loading';
import './Search.css';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
      currencies: [],
      loading: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect(id) {
    this.setState({
      searchQuery: '',
      currencies: [],
    })

    this.props.history.push(`/currency/${id}`);
  }

  handleChange(e) {
    const searchQuery = e.target.value;

    this.setState({
      searchQuery,
      loading: true,
    })

    if (!searchQuery) {
      return '';
    }

    fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
      .then(handleResponse)
      .then(currencies => {
        this.setState({
          currencies,
          loading: false,
        })
      })
  }

  renderSearchResults() {
    const { currencies, searchQuery, loading } = this.state;

    if (!searchQuery) {
      return '';
    }

    if (currencies.length > 0) {
      return (
        <div className="Search-result-container">
          {this.state.currencies.map(currency => {
            return (
              <div
                className="Search-result"
                key={currency.id}
                onClick={() => this.handleRedirect(currency.id)}
              >
                {currency.name} ({currency.symbol})
              </div>
            )
          })}
        </div>
      )
    }

    if (!loading) {
      return (
        <div className="Search-results-container">
          <div className="Search-no-result">
            No Results Found
          </div>
        </div>
      )
    }
  }

  render() {
    const { history, searchQuery } = this.props;

    return (
      <div className="Search">
        <span className="Search-icon" />

        <input
          className="Search-input"
          placeholder="Currency Name"
          type="text"
          value={searchQuery}
          autoFocus="true"
          onChange={this.handleChange}
        />

        {this.state.loading &&
          <div className="Search-loading">
            <Loading width="12px" height="12px"/>
          </div>
        }

        {this.renderSearchResults(history)}
      </div>
    )
  }
}

export default withRouter(Search);
