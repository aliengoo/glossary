"use strict";

import {combineReducers} from 'redux';
import {routerStateReducer as router} from 'redux-router';
import {authReducer as auth} from './../_common/security/authActions';
import {loginReducer as login} from '../login/loginActions';


export default combineReducers({
  router,
  auth,
  login
});