import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import HomePage from '../../modules/home/containers';
import TodoPage from '../../modules/todo/containers';
import TodoList from '../../modules/todo/components/TodoList';
import { TodoUpdateForm } from '../../modules/todo/components/TodoForm';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/todos" component={TodoPage}>
      <IndexRoute component={TodoList}/>
      <Route path="/todos/:id" component={TodoUpdateForm}/>
    </Route>
  </Route>
);
