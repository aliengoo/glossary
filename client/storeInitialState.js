"use strict";

import {AuthInitialState} from './_common/security/authActions';
import {LoginInitialState} from './login/loginActions';

export default {
  router: null,
  auth: AuthInitialState,
  login: LoginInitialState
};
