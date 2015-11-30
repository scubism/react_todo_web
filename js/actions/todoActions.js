import { processFetch } from '../utils/fetchUtil'
import Global from 'react-global'

export const LIST_TODOS = 'LIST_TODOS';
export const VIEW_TODO = 'VIEW_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

const ENDPOINT = Global.get('__TODO_API_ENDPOINT__')

export function listTodos() {
  return processFetch(
    LIST_TODOS, 'get', ENDPOINT + '/v1/todos', null,
    json => { return {todos: json}}
  );
}

export function viewTodo(todo, viewing) {
  let actionType = VIEW_TODO;
  if (!viewing) {
    return {type: actionType, todo: todo, viewing: viewing}
  }
  return processFetch(
    actionType, 'get', ENDPOINT + '/v1/todos/' + todo.id, null,
    json => { return {todo: json, viewing: viewing}}
  );
}

export function createTodo(todo) {
  return processFetch(
    CREATE_TODO, 'post', ENDPOINT + '/v1/todos', todo,
    json => { return {todo: json}}
  );
}

export function updateTodo(todo, updating) {
  return processFetch(
    UPDATE_TODO, 'put', ENDPOINT + '/v1/todos/' + todo.id, todo,
    json => { return {todo: json, updating: updating}}
  );
}

export function deleteTodo(todo, updating) {
  return processFetch(
    DELETE_TODO, 'delete', ENDPOINT + '/v1/todos/' + todo.id, null,
    json => { return {todo: json}}
  );
}
