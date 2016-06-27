import { takeLatest } from 'redux-saga'
import { call, put, fork, take } from 'redux-saga/effects'
import 'isomorphic-fetch'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createSuccessType(type) {
  return `${type}_${SUCCESS}`
}
function createFailureType(type) {
  return `${type}_${FAILURE}`
}

function callApi(path, options) {
  const TODO_API_ENDPOINT = typeof window === 'object' ? window.ENV.TODO_API_ENDPOINT : process.env.LOCAL_TODO_API_ENDPOINT;
  return fetch(TODO_API_ENDPOINT + path, options)
    .then(response => response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;
    });
}

export function* fetchApi(type, path, method, action) {
  let payload = action.payload || {};
  try {
    path = formatFetchPath(path, payload)
    const options = getFetchOptions(method, payload);
    const data = yield call(callApi, path, options);
    payload.resolve && payload.resolve(data);
    yield put({type: createSuccessType(type), data});
  } catch (error) {
    payload.reject && payload.reject(error);
    yield put({type: createFailureType(type), error});
  }
}

export function* watchFetchApi(actionCreator, path, method = 'get') {
  yield* takeLatest(actionCreator.toString(), fetchApi, actionCreator.toString(), path, method)
}

export function makeFetchHandlers(reducerMap) {
  let handlers = {};
  let getNextFetchState = (state, type, fetchState) => {
    return {
      fetchState: Object.assign({}, state.fetchState, {[type]: fetchState})
    }
  }
  for (let type in reducerMap) {
    handlers[type] = (state, action) => {
      return Object.assign({}, state,
        getNextFetchState(state, type, {error: null, fetching: true}));
    };
    handlers[createSuccessType(type)] = (state, action) => {
      let responseSelector = reducerMap[type];
      return Object.assign({}, state,
        responseSelector && responseSelector(state, action.data) || {},
        getNextFetchState(state, type, {error: null, fetching: false}));
    };
    handlers[createFailureType(type)] = (state, action) => {
      return Object.assign({}, state,
        getNextFetchState(state, type, {error: null, fetching: false}));
    };
  }
  return handlers;
}

export function makeFetchDefaultState(reducerMap) {
  let defaultState = { fetchState: {} };
  for (let type in reducerMap) {
    defaultState['fetchState'][type] = {error: null, fetching: false};
  }
  return defaultState;
}

function formatFetchPath(template, replacement)
{
  if (typeof replacement != "object")
  {
    replacement = Array.prototype.slice.call(arguments, 1);
  }
  return template.replace(/\${(.+?)\}/g, function(m, c)
  {
    return (replacement[c] != null) ? replacement[c] : m
  });
}

function getFetchOptions(method, payload) {
  let headers = Object.assign({'Accept': 'application/json'}, payload.headers)
  let data = payload.data
  if (!payload.raw) {
    headers = Object.assign(headers, {'Content-Type': 'application/json'})
    data = payload.data ? JSON.stringify(payload.data) : null
  }
  return {
    method: method,
    headers: headers,
    body: data
  }
}
