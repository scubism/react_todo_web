import { createAction } from 'redux-actions'

export const listTodos = createAction('LIST_TODOS');
export const createTodo = createAction('CREATE_TODO');
export const updateTodo = createAction('UPDATE_TODO');
export const deleteTodo = createAction('DELETE_TODO');

export const focusTodo = createAction('FOCUS_TODO');

/*
export const MOVE_TODO = createRequestTypes('MOVE_TODO');
export const VIEW_TODO = createRequestTypes('VIEW_TODO');
*/
