import { createStore, compose, applyMiddleware } from 'redux';
import createReducer from './createReducer';

export function configureStore(initialState = {}) {
  let store;
  if (process.env.PRODUCTION) {
    store = createStore(createReducer(), initialState,  compose());
  } else {
    const createLogger = require('redux-logger');
    const loggerMiddleware = createLogger();
    store = createStore(createReducer(), initialState,  compose(
      applyMiddleware(
        loggerMiddleware
      ),
      typeof window === 'object' &&
       typeof window.devToolsExtension !== 'undefined' ?
        window.devToolsExtension() : f => f
    ));
    if (module.hot) {
      module.hot.accept('./createReducer', () => {
        const _createReducer = require('./createReducer').default;
        store.replaceReducer(_createReducer());
      });
    }
  }

  store.asyncReducers = {};
  
  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
