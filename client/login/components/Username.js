"use strict";

import React, {Component, PropTypes} from 'react';
import Rx from 'rx';
import FormGroup from '../../_common/components/FormGroup';
import ControlLabel from '../../_common/components/ControlLabel';

export default class Username extends Component {

  componentDidMount() {

    const {onChange} = this.props;

    this.usernameObservable = Rx.Observable.fromEvent(this.refs.username, 'keyup')
      .debounce(500);

    this.usernameObservable.subscribe(ev => onChange(ev.target));
  }

  componentWillUnmount() {
    this.usernameObservable.unsubscribe();
  }

  render() {

    const fetching = this.props.fetching;

    return (
      <FormGroup>
        <ControlLabel>Username</ControlLabel>
        <input type="text" className="form-control" disabled={fetching} ref="username" name="username" required={true}
               maxLength={30} minLength={1}/>
      </FormGroup>
    );
  }
}

Username.propTypes = {
  fetching: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};