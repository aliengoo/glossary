"use strict";

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { compose, createStore, applyMiddleware } from 'redux';
import rootReducer from './rootReducer';
import { devTools, persistState } from 'redux-devtools';
import initialState from './storeInitialState';
import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter,
  pushState
} from 'redux-router';
import { createHistory } from 'history';

const loggerMiddleware = createLogger();

let finalCreateStore;

if (document.getElementById('react-container').hasAttribute("debug")) {
  // include debug information in page
  finalCreateStore = compose(
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware),
    reduxReactRouter({ createHistory }),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
  )(createStore);
} else {
  finalCreateStore = compose(applyMiddleware(
    thunkMiddleware,
    loggerMiddleware),
    reduxReactRouter({ createHistory })
  )(createStore);
}

let store = finalCreateStore(rootReducer, Object.assign({}, initialState));

export default store;