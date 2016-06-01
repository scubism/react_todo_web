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

export function callApi(path, option) {
  const TODO_API_ENDPOINT = typeof window === 'object' ? process.env.TODO_API_ENDPOINT : process.env.LOCAL_TODO_API_ENDPOINT;
  return fetch(TODO_API_ENDPOINT + path, option)
    .then(response => response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;
    });
}

export function* fetchApi(requestTypes, path, action) {
  try {
    path = format(path, action)
    let option = {}
    if(action.data && action.data.title !== "") {
      option = optionFilter(action.data)
    }
    const data = yield call(callApi, path, option);
    yield put({type: requestTypes.SUCCESS, data});
  } catch (error) {
    yield put({type: requestTypes.FAILURE, error});
  }
}

export function* watchApi(requestTypes, path) {
  yield* takeLatest(requestTypes.REQUEST, fetchApi, requestTypes, path)
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

function optionFilter(data) {
  let method = data.method
  let headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
  data = JSON.stringify(data)
  return {
    method: method,
    headers: headers,
    body: data
  }
}
