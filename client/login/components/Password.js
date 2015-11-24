"use strict";

import React, {Component, PropTypes} from 'react';
import FormGroup from '../../_common/components/FormGroup';
import ControlLabel from '../../_common/components/ControlLabel';

export default class Password extends Component {
  render() {

    const fetching = this.props.fetching;

    return (
      <FormGroup>
        <ControlLabel>Password</ControlLabel>
        <input type="password" className="form-control" disabled={fetching} ref="password"/>
      </FormGroup>
    );
  }
}

Password.propTypes = {
  fetching: PropTypes.bool
};