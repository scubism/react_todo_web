import { handleActions } from 'redux-actions'
import { makeFetchHandlers, makeFetchDefaultState } from '../../common/api'

import {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  focusTodo,
  viewTodo,
} from './actions';

const handlers = {
  [focusTodo]: (state, action) => Object.assign({}, state, {
    focusedTodo: action.payload
  }),
};
const defaultState = {
  focusedTodo: null,
};

const fetchReducerMap = {
  [listTodos]: (state, data) => { return {todos: data}; },
  [createTodo]: (state, data) => { return {todos: [...state.todos, data]}; },
  [updateTodo]: (state, data) => { return {todos: state.todos.map(todo => todo.id === data.id ? data : todo)}; },
  [deleteTodo]: (state, data) => { return {todos: state.todos.filter(todo => todo.id !== data.id)}; },
  [viewTodo]: (state, data) => { return {viewedTodo: data}; },
};
Object.assign(handlers, makeFetchHandlers(fetchReducerMap));
Object.assign(defaultState, makeFetchDefaultState(fetchReducerMap), {
  todos: null,
  viewedTodo: null,
});

export default handleActions(handlers, defaultState);
