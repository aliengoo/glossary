"use strict";

import React from 'react';
import {connect} from 'react-redux';
import FormGroup from '../_common/components/FormGroup';
import ControlLabel from '../_common/components/ControlLabel';

// actions
import {loginAction} from '../_common/security/authActions';

var Login = React.createClass({

  login: function () {
    this.props.dispatch(loginAction(this.refs.username, this.refs.password));
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

              <FormGroup>
                <ControlLabel>Username</ControlLabel>
                <input type="text" className="form-control" disabled={fetching} ref="username"/>
              </FormGroup>

              <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <input type="password" className="form-control" disabled={fetching} ref="password"/>
              </FormGroup>

              <button disabled={fetching} className="btn btn-primary" onClick={this.login}>Login</button>
            </form>
          </div>

        </div>
      </div>);
  }
});

export default connect(state => ({
  auth: state.auth
}))(Login);
