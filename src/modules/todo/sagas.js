import { watchFetchApi } from '../../common/api'
import { fork } from 'redux-saga/effects'

import {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './actions';

export default function* todoSagas() {
  yield [
    fork(watchFetchApi, listTodos, '/v1/todos'),
    fork(watchFetchApi, createTodo, '/v1/todos', 'post'),
    fork(watchFetchApi, updateTodo, '/v1/todos/${id}', 'put'),
    fork(watchFetchApi, deleteTodo, '/v1/todos/${id}', 'delete')
    /*fork(watchApi, VIEW_TODO, '/v1/todos/${id}'),,*/
  ]
}
