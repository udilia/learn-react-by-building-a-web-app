import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import Header from './components/common/Header';
import List from './components/list/List';
import Detail from './components/detail/Detail';
import NotFound from './components/notfound/NotFound';
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />

        <Switch>
          <Route exact path="/" component={List} />
          <Route exact path="/currency/:id" component={Detail} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
