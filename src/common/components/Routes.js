import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import LoginPage from '../../pages/login/containers';
import HomePage from '../../pages/home/containers';
import TodoPage from '../../pages/todo/containers';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="home" component={HomePage} />
    <Route path="todo" component={TodoPage} />
  </Route>
);
