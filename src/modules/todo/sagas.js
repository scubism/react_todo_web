import { watchApi } from '../../common/api'
import { fork } from 'redux-saga/effects'

import {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from './actions';

export default function* todoSagas() {
  yield [
    fork(watchApi, listTodos, '/v1/todos'),
    fork(watchApi, createTodo, '/v1/todos', 'post'),
    fork(watchApi, updateTodo, '/v1/todos/${id}', 'put'),
    fork(watchApi, deleteTodo, '/v1/todos/${id}', 'delete')
    /*fork(watchApi, VIEW_TODO, '/v1/todos/${id}'),,*/
  ]
}
