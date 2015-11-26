import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'

import Global from 'react-global'

import App from './containers/App'
import rootReducer from './reducers'
import { listTodos } from './actions/todoActions'

const loggerMiddleware = createLogger({
  predicate: (getState, action) => Global.get('__DEV__')
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore);

const store = createStoreWithMiddleware(rootReducer);

function loadStore() {
  store.dispatch(listTodos());
}

loadStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
