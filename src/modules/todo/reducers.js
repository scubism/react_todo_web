import { handleRequestActions } from '../../common/api'

import {
  listTodos,
  createTodo,
} from './actions';

export default handleRequestActions({
  [listTodos]: (state, data) => { return {todos: data}; },
  [createTodo]: (state, data) => { return {todos: [...state.todos, data]}; },
}, {
  todos: [],
  todo: null,
});

/*
export default function todoReducer(state = {
  todos: [],
  todo: null,
  fetchState: {[`${listTodos}`]: {}}
}, action) {
  switch (action.type) {
    case LIST_TODOS.BASE:
      return
    case VIEW_TODO.BASE:
      return reduceApi(state, action, VIEW_TODO, (data) => { return {todo: data}; });
    case CREATE_TODO.BASE:
      return reduceApi(state, action, CREATE_TODO, (data) => {
        return {todos: [...state.todos, data]};
      });
    case UPDATE_TODO.BASE:
      return reduceApi(state, action, UPDATE_TODO, (data) => {
        return {todos: state.todos.map(todo => todo.id === data.id ? data : todo)};
      });
    case DELETE_TODO.BASE:
      return reduceApi(state, action, DELETE_TODO, (data) => {
        return {todos: state.todos.filter(todo => todo.id !== data.id)};
      });
    default:
      return state;
  }
}
*/
