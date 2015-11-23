"use strict";

import _ from 'lodash';
import Immutable from 'immutable';
import keymirror from 'keymirror';
import {FetchStatus, invokeAsync} from '../api/restApi';
import store from '../../store';

const StorageKey = "glossary.token";

const AuthInitialState = Immutable.Map({
  err: null,
  fetching: false,
  username: null
});

const AuthActionTypes = keymirror({
  Login: null,
  Logout: null,
  IsAuthenticated: null
});

function loginAction(username, password) {
  return invokeAsync("POST", "/api/login", null, {username, password}, AuthActionTypes.Login);
}

function loginActionReducer(auth = AuthInitialState, action) {
  switch(action.fetchStatus) {
    case FetchStatus.FETCHING:
      return auth.merge(Immutable.Map({
        err: null,
        fetching: true
      }));
    case FetchStatus.COMPLETE:
      if (action.data.ok) {
        localStorage.setItem(StorageKey, action.data.token);

        store.router.transitionTo("glossary");

        return auth.merge(Immutable.Map({
          err: null,
          fetching: false,
          username: action.data.username
        }));
      } else {
        return auth.merge(Immutable.Map({
          err: action.data.err,
          fetching: false,
          username: null
        }));
      }
    case FetchStatus.FAILED:
      return auth.merge(Immutable.Map({
        err: action.data,
        fetching: false,
        username: null
      }));
  }
}

function logoutAction() {
  const token = localStorage.getItem(StorageKey) || "";
  return invokeAsync("DELETE", `/api/logout/${token}`, null, null, AuthActionTypes.Logout);
}

function logoutActionReducer(auth = AuthInitialState, action) {
  // remove the token
  localStorage.removeItem(StorageKey);

  // redirect to login
  store.router.transitionTo("login");

  // clear auth state (set the user name to nothing)
  return auth.merge(AuthInitialState);
}

function isAuthenticatedAction() {
  const token = localStorage.getItem(StorageKey) || "";
  return invokeAsync("GET", `/api/authenticated/${token}`,  null, null, AuthActionTypes.IsAuthenticated)
}

function isAuthenticatedActionReducer(auth = AuthInitialState, action) {
  switch(action.fetchStatus) {
    case FetchStatus.FETCHING:
      return auth.merge(Immutable.Map({
        err: null,
        fetching: true
      }));
    case FetchStatus.COMPLETE:
      if (!action.data.ok) {
        store.dispatch(logoutAction());
      }

      return auth.merge(Immutable.Map({
        err: null,
        fetching: false
      }));
  }
}

function authReducer(auth = AuthInitialState, action) {

  switch(action.type) {
    case AuthActionTypes.IsAuthenticated:
      return isAuthenticatedActionReducer(auth, action);
    case AuthActionTypes.Login:
      return loginActionReducer(auth, action);
    case AuthActionTypes.Logout:
      return logoutActionReducer(auth, action);
      break;
  }

  return auth;
}

export {
  AuthActionTypes,
  AuthInitialState,

  loginAction,
  logoutAction,
  isAuthenticatedAction,

  authReducer
};