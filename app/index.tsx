import * as React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import './app.global.scss';
import { DatabaseManager } from './db';

const path = require('path');
const fs = require('fs');

const env = process.env.NODE_ENV || "development";
const appConfig = require(`${__dirname}/config/appConfig.json`)[env];
const { configureStore, history } = require('./store/configureStore');
const store = configureStore();


// DATABASE
// TODO: Move to separate module and instantiate DB propery.
DatabaseManager.init()
.then(database => DatabaseManager.isActive())
.catch(err =>  {
  throw("Database connection error. Halting app. You need to have a database in order to proceed. Check DB config settings and DB location access.")
});


// TODO: Get these paths configured and available in a global settings file
// FILE SYSTEM
// Check for app folder first

// Check for tracks folder to store imported tracks
if(env === "production") {
  const tracksDir = path.join(
  require("electron").remote.app.getPath("appData"),
  //appConfig.appName,
  appConfig.tracksDirName);
  fs.access(tracksDir, fs.constants.F_OK, (err: any) => {
    console.log(`${tracksDir} ${err ? 'does not exist' : 'exists'}`);
    // If err, try and create directory
    fs.mkdir(tracksDir,function(e: any){
      if(!e || (e && e.code === 'EEXIST')){
          console.log("Tracks directory created at [" + tracksDir + "]");
      } else {
          console.log("Unable to create tracks directory." + e);
          throw("Unable to read/create tracks directory. Halting app. You need to have a location to store unpacked aduio files. Check App config settings and access/permission rights.");
      }
    });
  });
}


// EXPRESS
// Launch Express Server
import { runExpressServer } from './server/server';
runExpressServer();


render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

// HOT SWAP
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
