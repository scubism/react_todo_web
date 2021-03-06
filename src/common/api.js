import { takeLatest } from 'redux-saga'
import { call, put, fork, take } from 'redux-saga/effects'
import 'isomorphic-fetch'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function createSuccessType(type) {
  return `${type}_${SUCCESS}`
}
export function createFailureType(type) {
  return `${type}_${FAILURE}`
}

function convertToClientError(serverError) {
  try {
    let clientError = {};
    if (serverError.errors) {
      serverError.errors.forEach((error) => {
        clientError[error.field] = error.message;
      })
    }
    if (serverError.message) {
      clientError['_error'] = serverError.message;
    } else {
      clientError['_error'] = 'Unkown error';
    }
    return applyToStringForClientError(clientError);
  } catch (e) {
    return applyToStringForClientError({_error: e.message});
  }
}

function applyToStringForClientError(clientError) {
  clientError.toString = () => {return clientError._error}
  return clientError;
}

function callApi(path, options) {
  const TODO_API_ENDPOINT = typeof window === 'object' ? window.ENV.TODO_API_ENDPOINT : process.env.LOCAL_TODO_API_ENDPOINT;
  return fetch(TODO_API_ENDPOINT + path, options)
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(convertToClientError(json))
      }
      return json;
    })
    .catch((e) => {
      if (e._error) {
        throw e;
      } else {
        throw applyToStringForClientError({_error: e.message});
      }
    });
}

export function* fetchApi(type, path, method, options, action) {
  let payload = action.payload || {};
  try {
    let data;
    if (options.cache) {
      data = options.cache(payload);
    }
    if (data === null || data == undefined) {
      path = formatFetchPath(path, payload)
      const options = getFetchOptions(method, payload);
      data = yield call(callApi, path, options);
    }
    payload.resolve && payload.resolve(data);
    yield put({type: createSuccessType(type), triggeredAction: action, data});
  } catch (error) {
    payload.reject && payload.reject(error);
    yield put({type: createFailureType(type), triggeredAction: action, error});
  }
}

export function* watchFetchApi(actionCreator, path, method = 'get', options = {}) {
  yield* takeLatest(actionCreator.toString(), fetchApi, actionCreator.toString(), path, method, options)
}

export function makeFetchHandlers(reducerMap) {
  let handlers = {};
  let getNextFetchState = (state, type, fetchState) => {
    return {
      fetchState: Object.assign({}, state.fetchState, {
        [type]: Object.assign({}, state.fetchState[type], fetchState)
      })
    };
  }
  for (let type in reducerMap) {
    handlers[type] = (state, action) => {
      return Object.assign({}, state,
        getNextFetchState(state, type, {error: null, fetching: true}));
    };
    handlers[createSuccessType(type)] = (state, action) => {
      let responseSelector = reducerMap[type];
      return Object.assign({}, state,
        responseSelector && responseSelector(action.data, state, action.triggeredAction) || {},
        getNextFetchState(state, type, {error: null, fetching: false, lastFetchedAt: Date.now()}));
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
