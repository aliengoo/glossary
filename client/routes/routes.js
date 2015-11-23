import React from 'react';
import history from 'history/lib/createHashHistory';
import {Router, Route, Link} from 'react-router';
import { Provider } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import {
  ReduxRouter,
  routerStateReducer,
  reduxReactRouter,
  pushState
} from 'redux-router';

import store from '../store';

import Login from '../login/Login';
import Glossary from '../glossary/Glossary';

const routes = (<div>
  <Provider store={store}>
    <ReduxRouter>
      <Router history={history()}>
        <Route path="/login" component={Login}/>
        <Route path="/glossary" component={Glossary}/>
      </Router>
    </ReduxRouter>
  </Provider>
</div>);

const routesWithDebug = (<div>
  {routes}
  <DebugPanel top right bottom>
    <DevTools store={store} monitor={LogMonitor}/>
  </DebugPanel>
</div>);

export {
  routes,
  routesWithDebug
};