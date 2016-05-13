import { createStore, compose, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import createReducer from './createReducer';

export function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware()

  let store;
  if (process.env.PRODUCTION) {
    store = createStore(createReducer(), initialState,  compose(
      applyMiddleware(
        sagaMiddleware
      )
    ));
  } else {
    const createLogger = require('redux-logger');
    const loggerMiddleware = createLogger();
    store = createStore(createReducer(), initialState,  compose(
      applyMiddleware(
        sagaMiddleware,
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

  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(END)

  return store;
}

export function injectAsyncReducer(store, name, asyncReducer) {
  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}
