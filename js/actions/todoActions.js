import { actionForFetch } from '../utils/fetchUtil'
import Global from 'react-global'

export const LIST_TODOS = 'LIST_TODOS';
export const VIEW_TODO = 'VIEW_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

const ENDPOINT = Global.get('__TODO_API_ENDPOINT__')

export function listTodos() {
  return actionForFetch(
    LIST_TODOS, 'get', ENDPOINT + '/v1/todos', null,
    json => ({todos: json})
  );
}

export function viewTodo(todo, viewing) {
  let actionType = VIEW_TODO;
  if (!viewing) {
    return {type: actionType, todo: todo, viewing: viewing}
  }
  return actionForFetch(
    actionType, 'get', ENDPOINT + '/v1/todos/' + todo.id, null,
    json => ({todo: json, viewing: viewing})
  );
}

export function createTodo(todo) {
  return actionForFetch(
    CREATE_TODO, 'post', ENDPOINT + '/v1/todos', todo,
    json => ({todo: json})
  );
}

export function updateTodo(todo, updating) {
  let actionType = UPDATE_TODO;
  if (updating) {
    return {type: actionType, todo: todo, updating: updating}
  }
  return actionForFetch(
    actionType, 'put', ENDPOINT + '/v1/todos/' + todo.id, todo,
    json => ({todo: json, updating: updating})
  );
}

export function deleteTodo(todo, updating) {
  return actionForFetch(
    DELETE_TODO, 'delete', ENDPOINT + '/v1/todos/' + todo.id, null,
    json => ({todo: json})
  );
}
