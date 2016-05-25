import { takeLatest } from 'redux-saga'
import { call, put, fork, take } from 'redux-saga/effects'
import 'isomorphic-fetch'

const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

export function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`)
  return res;
}

export function callApi(path) {
  const TODO_API_ENDPOINT = typeof window === 'object' ? process.env.TODO_API_ENDPOINT : process.env.LOCAL_TODO_API_ENDPOINT;
  return fetch(TODO_API_ENDPOINT + path)
    .then(response => response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }
      return json;
    });
}

export function* fetchApi(requestTypes, path, dispatch) {
  try {
    if(dispatch.id) {
      path = path + dispatch.id
    }
    const data = yield call(callApi, path);
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
