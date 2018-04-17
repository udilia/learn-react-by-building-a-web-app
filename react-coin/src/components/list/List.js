import React from 'react';
import Loading from '../common/Loading';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import './Table.css';

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

    fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
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

  renderChangePercent(percent) {
    if (percent > 0) {
      return <span className='percent-raised'>{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className='percent-fallen'>{percent}% &darr;</span>
    } else {
      return <span>{percent}%</span>
    }
  }

  render() {
    if (this.state.loading) {
      return <div className='loading-container'><Loading /></div>
    }

    if (this.state.error) {
      return <div className='error'>{this.state.error}</div>
    }

    else {
      return <div>
        <table className='Table'>
          <thead className='Table-head'>
            <tr>
              <th>Cryptocurrency</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>24H Change</th>
            </tr>
          </thead>
          <tbody className='Table-body'>
            {this.state.currencies.map((currency) => (
              <tr key={currency.id}>
                <td>
                  <span className='Table-rank'>{currency.rank}</span>
                  {currency.name}
                </td>
                <td>
                  <span className='Table-dollar'>$</span>
                  {currency.price}
                </td>
                <td>
                  <span className='Table-dollar'>$</span>
                  {currency.marketCap}
                </td>
                <td>
                  {this.renderChangePercent(currency.percentChange24h)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    }
  }
}

export default List;
