import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import ImporterPage from './containers/ImporterPage';
import ToBeImporterPage from './containers/ToBeImporterPage';

export default () => (
  <App>
    <Switch>
      <Route path="/tobeimporter" component={ToBeImporterPage} />
      <Route path="/importer" component={ImporterPage} />
      <Route path="/counter" component={CounterPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
