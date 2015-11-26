import {
  LIST_TODOS,
  VIEW_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../actions/todoActions';

import {REQUEST, SUCCESS, FAILURE} from '../utils/fetchUtil'

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
    switch (action.status) {
    case REQUEST: return Object.assign({}, state, {isFetching: true});
    case FAILURE: return Object.assign({}, state, {isFetching: false, error: action.error});
    case SUCCESS:
      return Object.assign({}, state, {
        isFetching: false, lastUpdated: action.receivedAt,
        todos: action.todos,
      });
    }

  case VIEW_TODO:
    if (!action.viewing) {
      return Object.assign({}, state, {viewingTodo: null});
    }

    switch (action.status) {
    case REQUEST: return Object.assign({}, state, {isFetching: true});
    case FAILURE: return Object.assign({}, state, {isFetching: false, error: action.error});
    case SUCCESS:
      return Object.assign({}, state, {
        isFetching: false, lastUpdated: action.receivedAt,
        viewingTodo: action.todo,
      });
    }

  case CREATE_TODO:
    switch (action.status) {
    case REQUEST: return Object.assign({}, state, {isFetching: true});
    case FAILURE: return Object.assign({}, state, {isFetching: false, error: action.error});
    case SUCCESS:
      return Object.assign({}, state, {
        isFetching: false, lastUpdated: action.receivedAt,
        todos: [...state.todos, action.todo],
      });
    }

  case UPDATE_TODO:
    if (action.updating) {
      return Object.assign({}, state, {
        updatingTodoId: action.todo.id,
        viewingTodo: null,
      });
    }

    switch (action.status) {
    case REQUEST: return Object.assign({}, state, {isFetching: true});
    case FAILURE: return Object.assign({}, state, {isFetching: false, error: action.error});
    case SUCCESS:
      return Object.assign({}, state, {
        isFetching: false, lastUpdated: action.receivedAt,
        todos: state.todos.map(todo => todo.id === action.todo.id ? action.todo : todo),
        updatingTodoId: null,
      });
    }

  case DELETE_TODO:
    switch (action.status) {
    case REQUEST: return Object.assign({}, state, {isFetching: true});
    case FAILURE: return Object.assign({}, state, {isFetching: false, error: action.error});
    case SUCCESS:
      return Object.assign({}, state, {
        isFetching: false, lastUpdated: action.receivedAt,
        todos: state.todos.filter(todo => todo.id !== action.todo.id),
      });
    }
  }

  return state;
}
