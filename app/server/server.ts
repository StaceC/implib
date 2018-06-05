import * as express from 'express';
import {Server} from "http";

import {TracksController} from './controllers';

export const app: express.Application = express();

const port: number = 4001;
let server: Server;

app.use('/tracks', TracksController);

app.use('/track', express.static('tracks'));

export function runExpressServer(): void {
  server = app.listen(port, () => {
      console.log(`App is listening on port ${port}`)
  });
}

export function shutdownExpressServer(): void {
  console.log("Express server is shutting down...");
  server.close();
  console.log("Express server shutdown.");
}
