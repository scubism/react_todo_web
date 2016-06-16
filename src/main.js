/**
 * App entry point
 */

// Polyfill
import 'babel-polyfill';

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { match, Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { trigger } from 'redial';

// Routes
import Routes from './common/components/Routes';
import { configureStore } from './common/store';
import createSaga from './common/createSaga';

// Base styling
import './common/base.css';
if (process.env.BROWSER) {
  require("loaders.css/loaders.min.css")
}

// ID of the DOM element to mount app on
const DOM_APP_EL_ID = 'app';

const initialState = window.INITIAL_STATE || {};

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

const store = configureStore(initialState);
store.runSaga(createSaga())
const { dispatch } = store;

// Pull child routes using match. Adjust Router for vanilla webpack HMR,
// in development using a new key every time there is an edit.
match({ routes: Routes, location: location }, () => {
  // Render app with Redux and router context to container element.
  // We need to have a random in development because of `match`'s dependency on
  // `routes.` Normally, we would want just one file from which we require `routes` from.
  ReactDOM.render(
    <Provider store={store}>
        <Router routes={Routes} history={browserHistory} key={Math.random()}/>
    </Provider>,
    document.getElementById(DOM_APP_EL_ID)
  );

});

browserHistory.listen(location => {
  // Match routes based on location object:
  match({ routes: Routes, location: location }, (error, redirectLocation, renderProps) => {
    // Get array of route handler components:
    const { components } = renderProps;

    // Define locals to be provided to all lifecycle hooks:
    const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch,
      };

    // Don't fetch data for initial route, server has already done the work:
    if (window.INITIAL_STATE) {
      // Delete initial data so that subsequent data fetches can occur:
      delete window.INITIAL_STATE;
    } else {
      // Fetch mandatory data dependencies for 2nd route change onwards:
      trigger('fetch', components, locals);
    }

    // Fetch deferred, client-only data dependencies:
    trigger('defer', components, locals);

    trigger('done', components, locals);
  });
});
