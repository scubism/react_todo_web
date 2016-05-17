import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import LoginPage from '../../pages/login/containers';

import HomePage from '../../pages/home/containers';

import TodoPage from '../../pages/todo/containers';
import TodoList from '../../pages/todo/components/TodoList';
import TodoDetail from '../../pages/todo/components/TodoDetail';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="home" component={HomePage} />
    <Route path="/todos" component={TodoPage}>
      <IndexRoute component={TodoList}/>
      <Route path="/todos/:todoId" component={TodoDetail}/>
    </Route>
  </Route>
);
