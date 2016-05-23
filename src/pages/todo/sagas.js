import { watchApi } from '../../common/api'

import {
  LIST_TODOS,
  DETAIL_TODOS
} from './actions';

export default function* todoSagas() {
  yield [
    watchApi(LIST_TODOS, '/v1/todos'),
    watchApi(DETAIL_TODOS, '/v1/todos/48')
  ]
}

