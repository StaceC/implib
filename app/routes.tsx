import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ImporterPage from './containers/ImporterPage';
import PrototypePage from './containers/PrototypePage';

export default () => (
  <App>
    <Switch>
      <Route path="/prototype" component={PrototypePage} />
      <Route path="/importer" component={ImporterPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
