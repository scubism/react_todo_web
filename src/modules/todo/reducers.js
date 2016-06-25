import { handleActions } from 'redux-actions'
import { makeFetchReducerBasis } from '../../common/api'

import {
  listTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  focusTodo,
} from './actions';

const handlers = {
  [focusTodo]: (state, action) => Object.assign({}, state, {
    focusedTodo: action.payload
  }),
};
const defaultState = {
  focusedTodo: null,
};

const fetchReducerBasis = makeFetchReducerBasis({
  [listTodos]: (state, data) => { return {todos: data}; },
  [createTodo]: (state, data) => { return {todos: [...state.todos, data]}; },
  [updateTodo]: (state, data) => { return {todos: state.todos.map(todo => todo.id === data.id ? data : todo)}; },
  [deleteTodo]: (state, data) => { return {todos: state.todos.filter(todo => todo.id !== data.id)}; },
});
Object.assign(handlers, fetchReducerBasis.handlers);
Object.assign(defaultState, fetchReducerBasis.defaultState, {
  todos: [],
  todo: null,
});

export default handleActions(handlers, defaultState);
