import { reduceApi, getBaseType } from '../../common/api'

import {
  LIST_TODOS,
  VIEW_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  MOVE_TODO
} from './actions';

export default function todoReducer(state = {todos: []}, action) {
  switch (getBaseType(action.type)) {
    case LIST_TODOS.BASE:
      state = reduceApi(state, action, LIST_TODOS, (data) => { return {todos: data}; });
    case VIEW_TODO.BASE:
      state = reduceApi(state, action, VIEW_TODO, (data) => { return {todo: data}; });
    case CREATE_TODO.BASE:
      state = reduceApi(state, action, CREATE_TODO, (data) => { return {todo: data}; });
    default:
      return state;
  }
}
