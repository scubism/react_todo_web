import fetch from 'isomorphic-fetch'

export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

export function parseJSON(response) {
  return response.json()
}

export function tryParseJSON(jsonString) {
  try {
    let obj = JSON.parse(jsonString);
    if (obj && typeof obj === 'object' && obj !== null) {
          return obj;
    }
  }
  catch (exception) { }
  return false;
}

export function parseErrorMessage(error) {
  let errorMessage = 'Unexpected Error';
  if (typeof error === 'string') {
    let errorObject = tryParseJSON(error);
    if (!errorObject) {
      errorMessage = error;
    } else {
      if (errorObject.hasOwnProperty('message')) {
        errorMessage = errorObject.message;
      }
    }
  } else if (typeof error === 'object' && error.hasOwnProperty('message')) {
    errorMessage = error.message;
  }
  return errorMessage;
}

export function getFetchOptions(method, data) {
  return {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : null
  };
}

export function actionForFetch(actionType, method, path, requestData, getSuccessData) {
  return dispatch => {
   dispatch({type: actionType, status: REQUEST})
   return fetch(path, getFetchOptions(method, requestData))
    .then(checkStatus).then(parseJSON)
    .then(json => dispatch(Object.assign({
         type: actionType,
         status: SUCCESS,
         receivedAt: Date.now(),
       }, getSuccessData(json))))
    .catch(function(error) {dispatch({type: actionType, status: FAILURE, error: error})});
  }
}

export function reduceForFetch(state, action, getSuccessState) {
  switch (action.status) {
  case REQUEST: return Object.assign({}, state, {isFetching: true, error: null});
  case FAILURE: return Object.assign({}, state, {isFetching: false, error: parseErrorMessage(action.error)});
  case SUCCESS:
    return Object.assign({}, state, Object.assign({
      isFetching: false, error: null, lastUpdated: action.receivedAt,
    }, getSuccessState(action)));
  }
}
