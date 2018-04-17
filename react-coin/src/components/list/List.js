import React from 'react';
import { handleResponse } from '../../helpers';

class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
    }
  }

  componentDidMount() {
    this.setState({ loading: true })

    fetch('https://api.udilia.com/coins/v1/cryptocurrencies?page=1&perPage=20')
      .then(handleResponse)
      .then((data) => {
        this.setState({
          currencies: data.currencies,
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

  render() {
    if (this.state.loading === true) {
      return <div>Loading...</div>
    } else {
      return <div>text</div>
    }
  }
}

export default List;
