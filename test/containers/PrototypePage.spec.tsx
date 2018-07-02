import '../utils/enzymeConfig';
import * as React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import PrototypePage from '../../app/containers/PrototypePage';
import { IState } from '../../app/reducers';
import {} from 'jest';
import { DatabaseManager } from '../../app/db';

DatabaseManager.init()
.then()
.catch();

const PrototypePageAny = PrototypePage as any;
let { configureStore, history } = require('../../app/store/configureStore');

const initialAppState = {
  staged: { tracks: [] },
  library: { tracks: [], isFetching: false }
}

function setup(initialState?: IState) {

  const store = configureStore(initialState);
  const app = mount(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PrototypePageAny />
      </ConnectedRouter>
    </Provider>
  );
  return {
    app,
    buttons: app.find('button'),
    stage: app.find('.stage'),
    library: app.find('.library')
  };
}

describe('containers', () => {
  describe('App', () => {

    const launchedApp = setup(initialAppState);

    it('should display an empty staging area', () => {
        const stagedTracksList = launchedApp.stage.find('.stagedTracksList');
        expect(stagedTracksList.text() === 'Empty Tracks List').toBe(true);
    });

  });
});
