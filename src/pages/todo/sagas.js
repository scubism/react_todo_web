import { watchApi } from '../../common/api'
import { fork } from 'redux-saga/effects'

import {
  LIST_TODOS,
  DETAIL_TODOS
} from './actions';

export default function* todoSagas() {
  yield [
    fork(watchApi, LIST_TODOS, '/v1/todos'),
    fork(watchApi, DETAIL_TODOS, '/v1/todos/')
  ]
}

