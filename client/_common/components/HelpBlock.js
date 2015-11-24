"use strict";

import React, {Component, PropTypes} from 'react';

export default class HelpBlock extends Component {
  render() {
    return (<span className="help-block">{this.props.children}</span>);
  }
}