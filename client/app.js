"use strict";

require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('./__app.scss');
global.jQuery = require('jquery');
global.foundation = require('bootstrap');
import React from 'react';
import ReactDOM from 'react-dom';
import {routes, routesWithDebug} from './routes/routes';

const reactContainer = document.getElementById('react-container');

if (reactContainer.hasAttribute("debug")) {
  ReactDOM.render(routesWithDebug, reactContainer);
} else {
  ReactDOM.render(routes, reactContainer);
}



