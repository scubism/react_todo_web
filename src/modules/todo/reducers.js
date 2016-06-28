import { handleActions } from 'redux-actions'
import { makeFetchHandlers, makeFetchDefaultState } from '../../common/api'

import {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  focusTodo,
  viewTodo,
  moveTodo,
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
  [listTodos]: (data) => { return {todos: data}; },
  [createTodo]: (data, state) => { return {todos: [...state.todos, data]}; },
  [updateTodo]: (data, state) => { return {todos: state.todos.map(todo => todo.id === data.id ? data : todo)}; },
  [deleteTodo]: (data, state) => { return {todos: state.todos.filter(todo => todo.id !== data.id)}; },
  [viewTodo]: (data) => { return {viewedTodo: data}; },
  [moveTodo]: (data, state, payload) => { return {todos: payload.stagedTodos}; },
};
Object.assign(handlers, makeFetchHandlers(fetchReducerMap));
Object.assign(defaultState, makeFetchDefaultState(fetchReducerMap), {
  todos: [],
  viewedTodo: null,
});

export default handleActions(handlers, defaultState);
