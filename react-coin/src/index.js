import React from 'react';
import { render } from 'react-dom';
import Header from './components/common/Header';

const App = () => {
  const title = 'React Coin';
  return <div>
    <Header />
    <h1>{title}</h1>
  </div>
};

render(<App/>, document.getElementById('root'));
