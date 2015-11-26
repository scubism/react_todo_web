import fetch from 'isomorphic-fetch'
import {checkStatus, parseJSON, getFetchOptions, REQUEST, SUCCESS, FAILURE} from '../utils/fetchUtil'
import Global from 'react-global'

export const LIST_TODOS = 'LIST_TODOS';
export const VIEW_TODO = 'VIEW_TODO';
export const CREATE_TODO = 'CREATE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';

const ENDPOINT = Global.get('__TODO_API_ENDPOINT__')

export function listTodos() {
  let actionType = LIST_TODOS;
  return dispatch => {
   dispatch({type: actionType, status: REQUEST})
   return fetch(ENDPOINT + '/v1/todos')
    .then(checkStatus).then(parseJSON)
    .then(json => dispatch({
         type: actionType,
         status: SUCCESS,
         receivedAt: Date.now(),
         todos: json,
       }))
    .catch(function(error) {dispatch({type: actionType, status: FAILURE, error: error})});
  }
}

export function viewTodo(todo, viewing) {
  let actionType = VIEW_TODO;

  if (!viewing) {
    return {type: actionType, todo: todo, viewing: viewing}
  }

  return dispatch => {
   dispatch({type: actionType, status: REQUEST})
   return fetch(ENDPOINT + '/v1/todos/' + todo.id)
    .then(checkStatus).then(parseJSON)
    .then(json => dispatch({
         type: actionType, status: SUCCESS, receivedAt: Date.now(),
         todo: json,
         viewing: viewing,
       }))
    .catch(function(error) {dispatch({type: actionType, status: FAILURE, error: error})});
  }
}

export function createTodo(todo) {
  let actionType = CREATE_TODO;

  return dispatch => {
   dispatch({type: actionType, status: REQUEST})
   return fetch(ENDPOINT + '/v1/todos', getFetchOptions('post', todo))
    .then(checkStatus).then(parseJSON)
    .then(json => dispatch({
         type: actionType, status: SUCCESS, receivedAt: Date.now(),
         todo: json,
       }))
    .catch(function(error) {dispatch({type: actionType, status: FAILURE, error: error})});
  }
}

export function updateTodo(todo, updating) {
  let actionType = UPDATE_TODO;

  if (updating) {
    return {type: actionType, todo: todo, updating: updating}
  }

  return dispatch => {
   dispatch({type: actionType, status: REQUEST})
   return fetch(ENDPOINT + '/v1/todos/' + todo.id, getFetchOptions('put', todo))
    .then(checkStatus).then(parseJSON)
    .then(json => dispatch({
         type: actionType, status: SUCCESS, receivedAt: Date.now(),
         todo: json,
         updating: updating,
       }))
    .catch(function(error) {dispatch({type: actionType, status: FAILURE, error: error})});
  }
}

export function deleteTodo(todo) {
  let actionType = DELETE_TODO;

  return dispatch => {
   dispatch({type: actionType, status: REQUEST})
   return fetch(ENDPOINT + '/v1/todos/' + todo.id, getFetchOptions('delete', null))
    .then(checkStatus).then(parseJSON)
    .then(json => dispatch({
         type: actionType, status: SUCCESS, receivedAt: Date.now(),
         todo: json,
       }))
    .catch(function(error) {dispatch({type: actionType, status: FAILURE, error: error})});
  }
}
