import { watchApi } from '../../common/api'
import { fork } from 'redux-saga/effects'

import {
  listTodos,
  createTodo,
} from './actions';

export default function* todoSagas() {
  yield [
    fork(watchApi, listTodos, '/v1/todos'),
    fork(watchApi, createTodo, '/v1/todos', 'post'),
    /*fork(watchApi, VIEW_TODO, '/v1/todos/${id}'),
    fork(watchApi, UPDATE_TODO, '/v1/todos/${id}', 'put'),
    fork(watchApi, DELETE_TODO, '/v1/todos/${id}', 'delete'),*/
  ]
}
