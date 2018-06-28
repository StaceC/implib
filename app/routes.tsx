import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import PrototypePage from './containers/PrototypePage';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={PrototypePage} />
    </Switch>
  </App>
);
