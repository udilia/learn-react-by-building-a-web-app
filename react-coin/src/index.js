import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import NotFound from './components/notFound/NotFound';
import Detail from './components/detail/Detail';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <Switch>
          <Route path="/" component={List} exact />
          <Route path="/currency/:id" component={Detail} exact />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  )
};

render(<App/>, document.getElementById('root'));
