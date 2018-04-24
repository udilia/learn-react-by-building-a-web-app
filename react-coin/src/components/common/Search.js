import React from 'react';
import './Search';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ searchQuery: e.target.value.toUpperCase() })
  }

  render() {
    return (
      <form>
        <input type="text" value={this.state.value} autoFocus="true" onChange={this.handleChange} />
      </form>
    )
  }
}

export default Search;
