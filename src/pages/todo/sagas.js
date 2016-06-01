import { watchApi } from '../../common/api'
import { fork } from 'redux-saga/effects'

import {
  LIST_TODOS,
  VIEW_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  MOVE_TODO
} from './actions';

export default function* todoSagas() {
  yield [
    fork(watchApi, LIST_TODOS, '/v1/todos'),
    fork(watchApi, VIEW_TODO, '/v1/todos/${id}'),
    fork(watchApi, CREATE_TODO, '/v1/todos'),
  ]
}

