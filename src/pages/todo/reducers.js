import { reduceApi } from '../../common/api'

import {
  LIST_TODOS
} from './actions';

export default function todoReducer(state = {todos: []}, action) {
  state = reduceApi(state, action, LIST_TODOS, (data) => { return {todos: data}; });
  return state;
}
