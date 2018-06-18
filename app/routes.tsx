import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import PrototypePage from './containers/PrototypePage';

export default () => (
  <App>
    <Switch>
      <Route path="/prototype" component={PrototypePage} />      
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
