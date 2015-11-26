import {
  LIST_TODOS,
  VIEW_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from '../actions/todoActions';

export default function todosReducer(state = {
  todos: [],
  viewingTodoId: null,
  updatingTodoId: null,
}, action) {
  switch (action.type) {
  case LIST_TODOS:
    return Object.assign({}, state, {
      todos: action.todos,
    });
  case VIEW_TODO:
    return Object.assign({}, state, {
      viewingTodoId: action.viewing ? action.todo.id : null,
    });
  case CREATE_TODO:
    let nextId = state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1;
    return Object.assign({}, state, {
      todos: [
        ...state.todos,
        Object.assign({}, action.todo, { id: nextId })
      ],
    });
  case UPDATE_TODO:
    return Object.assign({}, state, {
      todos: action.updating ?
          state.todos : state.todos.map(todo =>
          todo.id === action.todo.id ? action.todo : todo
        ),
      updatingTodoId: action.updating ? action.todo.id : null,
    });
  case DELETE_TODO:
    return Object.assign({}, state, {
      todos: state.todos.filter(todo =>
          todo.id !== action.todo.id
        ),
    });
  default:
    return state;
  }
}
