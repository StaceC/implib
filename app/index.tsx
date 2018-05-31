import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import './app.global.scss';
import db from './db/models';

var log = require('electron-log');

const { configureStore, history } = require('./store/configureStore');
const store = configureStore();

// TODO: Move to separate module and instantiate DB propery.
db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        log.info('Connection has been established successfully.');
    })
    .catch((err: any) => {
        console.error('Unable to connect to the database:', err);
        log.error('Unable to connect to the database: ' + err);
    });
// Change force to true to wipe DB currently
db.Todo.sync({force: false}).then(() => {
  // Table created
  /*
  return db.Todo.create({
    text: 'Something',
    completed: false
  });
  */
});

// Check for tracks folder to store imported tracks
var fs = require('fs');
fs.access("tracks", fs.constants.F_OK, (err: any) => {
  console.log(`tracks ${err ? 'does not exist' : 'exists'}`);
});

// Launch Express Server
import { runExpressServer } from './server/server';
runExpressServer();

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
