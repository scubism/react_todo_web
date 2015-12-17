import {
  LIST_TODOS,
  VIEW_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  MOVE_TODO
} from '../actions/todoActions';

import { reduceForFetch } from '../utils/fetchUtil'

export default function todosReducer(state = {
  todos: [],
  viewingTodo: null,
  updatingTodoId: null,
  isFetching: false,
  error: null,
  lastUpdated: null,
}, action) {
  switch (action.type) {

  case LIST_TODOS:
    return reduceForFetch(state, action,
      action => ({todos: action.todos})
    );

  case VIEW_TODO:
    return reduceForFetch(state, action,
      action => ({viewingTodo: action.todo})
    );

  case CREATE_TODO:
    return reduceForFetch(state, action,
      action => ({todos: [...state.todos, action.todo]})
    );

  case UPDATE_TODO:
    if (action.updating) {
      return Object.assign({}, state, {
        updatingTodoId: action.todo.id,
        viewingTodo: null,
      });
    }
    return reduceForFetch(state, action,
      action => ({
        todos: state.todos.map(todo => todo.id === action.todo.id ? action.todo : todo),
        updatingTodoId: null,
      })
    );

  case DELETE_TODO:
    return reduceForFetch(state, action,
      action => ({todos: state.todos.filter(todo => todo.id !== action.todo.id)})
    );

  case MOVE_TODO:
    return reduceForFetch(state, action,
      action => ({todos: action.optimisticTodos})
    );

  }


  return state;
}
