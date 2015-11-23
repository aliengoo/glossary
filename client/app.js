"use strict";

require('../node_modules/bootstrap/dist/css/bootstrap.css');
require('./__app.scss');
global.jQuery = require('jquery');
global.foundation = require('foundation');

import ReactDOM from 'react-dom';
import Root from './root/Root';

const reactContainer = document.getElementById('react-container');

ReactDOM.render(<Root/>, reactContainer);