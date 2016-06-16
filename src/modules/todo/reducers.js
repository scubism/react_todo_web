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
      state = reduceApi(state, action, CREATE_TODO, (data) => {
        return {todos: [...state.todos, data]}; 
      });
    case UPDATE_TODO.BASE:
      state = reduceApi(state, action, UPDATE_TODO, (data) => { 
        return {todos: state.todos.map(todo => todo.id === data.id ? data : todo)}; 
      });
    case DELETE_TODO.BASE:
      state = reduceApi(state, action, DELETE_TODO, (data) => { 
        return {todos: state.todos.filter(todo => todo.id !== data.id)}; 
      });
    default:
      return state;
  }
}
