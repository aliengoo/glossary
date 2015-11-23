"use strict";

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers/rootReducer';
import { devTools, persistState } from 'redux-devtools';
import initialState from './storeInitialState';
import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter,
  pushState
} from 'redux-router';
import {routesWithDebug, routes} from './routes/routes';
import createHistory from "history/lib/createHashHistory";

const loggerMiddleware = createLogger();

let createStoreWithMiddleware;

if (document.getElementById('react-container').hasAttribute("debug")) {
  // include debug information in page
  createStoreWithMiddleware = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware),
    reduxReactRouter({routesWithDebug, createHistory}),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  createStoreWithMiddleware = compose(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware),
    reduxReactRouter({routes, createHistory})
  )(createStore);
}

let store = createStoreWithMiddleware(rootReducer, Object.assign({}, initialState));

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('./reducers/rootReducer', () => {
    const nextRootReducer = require('./reducers/rootReducer');
    store.replaceReducer(nextRootReducer);
  });
}

export default store;