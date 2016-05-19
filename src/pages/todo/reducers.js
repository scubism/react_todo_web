import { reduceApi } from '../../common/api'

import {
  LIST_TODOS,
  DETAIL_TODOS
} from './actions';

export default function todoReducer(state = {todos: []}, action) {
  if (Object.values(LIST_TODOS).indexOf(action.type)  !== -1) {
    state = reduceApi(state, action, LIST_TODOS, (data) => { return {todos: data}; });
  }
  if (Object.values(DETAIL_TODOS).indexOf(action.type) !== -1) {
    state = reduceApi(state, action, DETAIL_TODOS, (data) => { return {todo: data}; });
  }
  return state;
}
