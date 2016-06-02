import { takeLatest } from 'redux-saga'
import { call, put, fork, take } from 'redux-saga/effects'
import 'isomorphic-fetch'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function createRequestTypes(base) {
  const res = {BASE: base};
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`)
  return res;
}

export function callApi(path, options) {
  const TODO_API_ENDPOINT = typeof window === 'object' ? process.env.TODO_API_ENDPOINT : process.env.LOCAL_TODO_API_ENDPOINT;
  return fetch(TODO_API_ENDPOINT + path, options)
    .then(response => response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;
    });
}

export function* fetchApi(requestTypes, path, method, action) {
  try {
    console.log(action);
    path = format(path, action)
    const options = getFetchOptions(method, action);
    const data = yield call(callApi, path, options);
    yield put({type: requestTypes.SUCCESS, data});
  } catch (error) {
    yield put({type: requestTypes.FAILURE, error});
  }
}

export function* watchApi(requestTypes, path, method = 'get') {
  yield* takeLatest(requestTypes.REQUEST, fetchApi, requestTypes, path, method)
}

export function reduceApi(state, action, requestTypes, onSuccess) {
  switch (action.type) {
    case requestTypes.REQUEST:
      return Object.assign({}, state, {fetching: true});
    case requestTypes.FAILURE:
      return Object.assign({}, state, {error: action.error, fetching: false});
    case requestTypes.SUCCESS:
      return Object.assign({}, state, {error: null, fetching: false}, onSuccess(action.data));
  }
  return state;
}

export function getBaseType(actionType) {
  let baseType = actionType.split("_").slice(0,-1).join("_");
  return baseType;
}

function format(template, replacement)
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

function getFetchOptions(method, action) {
  let headers = Object.assign({'Accept': 'application/json'}, action.headers)
  let data = action.data
  if (!action.raw) {
    headers = Object.assign(headers, {'Content-Type': 'application/json'})
    data = action.data ? JSON.stringify(action.data) : null
  }
  return {
    method: method,
    headers: headers,
    body: data
  }
}
