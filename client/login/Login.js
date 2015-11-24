"use strict";

import React from 'react';
import {connect} from 'react-redux';
import FormGroup from '../_common/components/FormGroup';
import ControlLabel from '../_common/components/ControlLabel';
import Username from './components/Username';
import Password from './components/Password';

// actions
import {loginAction} from '../_common/security/authActions';
import * as loginActions from './loginActions';

var Login = React.createClass({

  login: function () {
    this.props.dispatch(loginAction(this.refs.username, this.refs.password));
  },

  onUsernameChange: function(element) {
    const {dispatch, $loginFormValidity} = this.props;

    dispatch(loginActions.setUsernameAction(element.value));
    dispatch(loginActions.validateUsernameAction(element, $loginFormValidity));
  },

  onPasswordChange: function(element) {
    const {dispatch, $loginFormValidity} = this.props;

    dispatch(loginActions.setPasswordAction(element.value));
    dispatch(loginActions.validatePasswordAction(element, $loginFormValidity));
  },

  render: function () {
    const fetching = this.props.auth.get('fetching');


    return (
      <div className="container">
        <div className="col-sm-12">

          <div className="col-sm-offset-4 col-sm-4">
            <header>
              <h1>Login</h1>
            </header>

            <form name="loginForm">

              <Username fetching={fetching} onChange={this.onUsernameChange}/>
              <Password fetching={fetching} onChange={this.onPasswordChange}/>
,
              <button disabled={fetching} className="btn btn-primary" onClick={this.login}>Login</button>
            </form>
          </div>

        </div>
      </div>);
  }
});

export default connect(state => ({
  auth: state.auth,
  login: state.login
}))(Login);
