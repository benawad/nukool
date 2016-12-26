import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import Home from './components/Home';
import Waiting from './components/Waiting';
import ResultPage from './components/ResultPage';

import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux'
import store, { history } from './store';
import './css/styles.css'


const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home}></IndexRoute>
        <Route path='/wait' component={Waiting}/>
        <Route path='/result' component={ResultPage}/>
      </Route>
    </Router>
  </Provider>
)

ReactDOM.render(
  router,
  document.getElementById('root')
);
