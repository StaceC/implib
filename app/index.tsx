import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import './app.global.scss';

const { configureStore, history } = require('./store/configureStore');
const store = configureStore();

import {Sequelize} from 'sequelize-typescript';

const sequelize =  new Sequelize({
        database: 'some_db',
        dialect: 'sqlite',
        username: 'root',
        password: '',
        storage: ':memory:',
        modelPaths: [__dirname + '/db/models']
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err: any) => {
    console.error('Unable to connect to the database:', err);
  });

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
