"use strict";

import Immutable from 'immutable';
import keymirror from 'keymirror';
import {validateElementInContainer, evaluateContainerValidity} from '../_common/validation/validation';

const LoginContext = "login";

const LoginActionTypes = keymirror({
  SetUsername: null,
  ValidateUsername: null,
  SetPassword: null,
  ValidatePassword: null,
  EvaluateContainerValidity: null
});

const LoginInitialState = Immutable.Map({
  $loginFormValidity: Immutable.Map({}),
  username: null,
  password: null
});

function setUsernameAction(username) {
  return {
    type: LoginActionTypes.SetUsername,
    data: username,
    context: LoginContext
  };
}

function validateUsernameAction(element, loginFormValidity) {
  return {
    type: LoginActionTypes.ValidateUsername,
    data: validateElementInContainer(element, loginFormValidity),
    context: LoginContext
  };
}

function setPasswordAction(password) {
  return {
    type: LoginActionTypes.SetPassword,
    data: password,
    context: LoginContext
  };
}

function validatePasswordAction(element, loginFormValidity) {
  return {
    type: LoginActionTypes.ValidatePassword,
    data: validateElementInContainer(element, loginFormValidity),
    context: LoginContext
  };
}

function evaluateContainerValidityAction(loginFormValidity) {
  return {
    type: LoginActionTypes.EvaluateContainerValidity,
    data: evaluateContainerValidity(loginFormValidity),
    context: LoginContext
  };
}

function loginReducer(state = LoginInitialState, action) {
  //noinspection FallThroughInSwitchStatementJS
  switch (action.type) {
    case LoginActionTypes.SetPassword:
      return state.set('password', action.data);
    case LoginActionTypes.SetUsername:
      return state.set('username', action.data);
    case LoginActionTypes.ValidatePassword:
    case LoginActionTypes.ValidateUsername:
      evaluateContainerValidityAction(action.data);
    case LoginActionTypes.EvaluateContainerValidity:
      return state.set('$loginFormValidity', action.data);
  }

  return state;
}

export {
  LoginContext,
  LoginInitialState,
  LoginActionTypes,

  setUsernameAction,
  validateUsernameAction,
  setPasswordAction,
  validatePasswordAction,
  evaluateContainerValidityAction,

  loginReducer
};
