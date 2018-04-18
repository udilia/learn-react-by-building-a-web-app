import React from 'react';
import { Link } from 'react-router-dom';
import './Detail.css';
import '../notFound/NotFound.css';

class Detail extends React.Component {
  render() {
    return (
      <div>
        <div>
          You navigated to {this.props.match.url}
        </div>
        <Link to="/" className="NotFound-link">Go to homepage</Link>
      </div>
    )
  }
}

export default Detail;
