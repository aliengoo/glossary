"use strict";

import {combineReducers} from 'redux';
import {routerStateReducer} from 'redux-router';
import {authReducer} from './_common/security/authActions';

export default combineReducers({
  router: routerStateReducer
});